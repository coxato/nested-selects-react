import { createRoot } from 'react-dom/client';

import App from './app/app';

// no <StrictMode> on purpose: NestedSelects is a class component whose mount
// logic is not idempotent under StrictMode's dev double-mount
createRoot(document.getElementById('root')).render(<App />);
