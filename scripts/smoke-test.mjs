/*
 Smoke test for the packed library against the supported React range.

 For each React version it creates a throwaway npm project, installs the
 freshly packed tarball, renders a <NestedSelects> tree in jsdom, changes a
 <select> value and asserts that the sub-select appears and getvalues fires.

 Usage: pnpm build && pnpm test:react16   (or: node scripts/smoke-test.mjs)
*/
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

if (!existsSync(path.join(root, 'dist', 'index.js'))) {
    console.error('dist/ not found, run "pnpm build" first');
    process.exit(1);
}

const baseTmp = process.env.SMOKE_TMPDIR || tmpdir();
const work = mkdtempSync(path.join(baseTmp, 'nsr-smoke-'));
console.log(`working dir: ${work}`);

// pack the library exactly as npm publish would
execSync(`npm pack --pack-destination ${JSON.stringify(work)}`, { cwd: root, stdio: 'pipe' });
const tarball = readdirSync(work).find((f) => f.endsWith('.tgz'));
if (!tarball) throw new Error('npm pack produced no tarball');
const tarballPath = path.join(work, tarball);

// the shared body of the test app; module-system wrappers below
const testBody = (loadCode, renderCode, changeCode) => `
const { JSDOM } = requireOrImported.jsdom;
const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

${loadCode}

const h = React.createElement;
let captured = null;
const getvalues = (values) => { captured = values; };

const tree = h(NestedSelects, { getvalues },
    h(Select, { name: 'car-part', label: 'Choose a part' },
        h(Option, { value: 'engine' }, 'Engine'),
        h(Option, { value: 'paint' }, 'Paint',
            h(MakeVisible, null,
                h(Select, { name: 'paint-color' },
                    h(Option, { value: 'red' }, 'Red'),
                    h(Option, { value: 'blue' }, 'Blue')
                )
            )
        )
    )
);

const assert = (cond, msg) => {
    if (!cond) {
        console.error('ASSERTION FAILED: ' + msg);
        process.exit(1);
    }
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
    ${renderCode}
    await sleep(50);

    assert(document.querySelectorAll('select').length === 1, 'expected 1 select after mount, got ' + document.querySelectorAll('select').length);

    const select = document.querySelector('select[name="car-part"]');
    assert(select, 'principal select rendered');
    select.value = 'paint';
    ${changeCode}
    await sleep(50);

    assert(document.querySelectorAll('select').length === 2, 'expected sub-select to appear, got ' + document.querySelectorAll('select').length + ' selects');
    assert(document.querySelector('select[name="paint-color"]'), 'sub-select paint-color rendered');
    assert(captured !== null, 'getvalues was called');
    assert(JSON.stringify(captured).includes('paint'), 'getvalues received the selected value, got: ' + JSON.stringify(captured));

    console.log('OK react ' + React.version + ' — values: ' + JSON.stringify(captured));
})().catch((err) => {
    console.error(err);
    process.exit(1);
});
`;

const cjsTest = `const requireOrImported = { jsdom: require('jsdom') };
${testBody(
    `const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-dom/test-utils');
const { NestedSelects, Select, Option, MakeVisible } = require('nested-selects-react');`,
    `ReactDOM.render(tree, document.getElementById('root'));`,
    `TestUtils.Simulate.change(select);`
)}`;

const esmTest = `import * as jsdomModule from 'jsdom';
const requireOrImported = { jsdom: jsdomModule };
${testBody(
    `const { default: React } = await import('react');
const { createRoot } = await import('react-dom/client');
const { NestedSelects, Select, Option, MakeVisible } = await import('nested-selects-react');`,
    `createRoot(document.getElementById('root')).render(tree);`,
    `select.dispatchEvent(new dom.window.Event('change', { bubbles: true }));`
)}`;

const scenarios = [
    { name: 'react-16.2', react: '16.2.0', file: 'test.cjs', code: cjsTest },
    { name: 'react-16.14', react: '16.14.0', file: 'test.cjs', code: cjsTest },
    { name: 'react-17', react: '17.0.2', file: 'test.cjs', code: cjsTest },
    { name: 'react-18', react: '18.3.1', file: 'test.cjs', code: cjsTest },
    { name: 'react-19', react: '19.2.7', file: 'test.mjs', code: esmTest }
];

let failed = false;
for (const scenario of scenarios) {
    const dir = path.join(work, scenario.name);
    mkdirSync(dir);
    writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name: scenario.name, private: true }));
    console.log(`\n=== ${scenario.name} (react@${scenario.react}) ===`);
    try {
        // a plain npm install also proves the peerDependencies range resolves
        execSync(
            `npm install --no-audit --no-fund --loglevel=error ${JSON.stringify(tarballPath)} react@${scenario.react} react-dom@${scenario.react} jsdom`,
            { cwd: dir, stdio: 'inherit' }
        );
        writeFileSync(path.join(dir, scenario.file), scenario.code);
        execSync(`node ${scenario.file}`, { cwd: dir, stdio: 'inherit' });
    } catch {
        console.error(`FAILED: ${scenario.name}`);
        failed = true;
    }
}

console.log(failed ? '\nSMOKE TEST FAILED' : '\nAll smoke tests passed');
process.exit(failed ? 1 : 0);
