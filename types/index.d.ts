import * as React from 'react';

// ---------- structure objects ----------

export interface OptionObject {
    value: string;
    text: React.ReactNode;
    makeVisible: Array<ElementObject | React.ReactElement>;
    elementType: 'option';
}

export interface SelectObject {
    elementType: 'select';
    /** name or id is mandatory */
    name?: string;
    id?: string | null;
    customchange?: CustomChangeHandler | null;
    placeholder?: string;
    label?: string | null;
    options: OptionObject[];
}

export interface ComponentObject {
    elementType: 'component';
    name: string;
    component: React.ReactElement;
}

export type ElementObject = SelectObject | ComponentObject;

// ---------- callbacks ----------

/**
 * Second argument of a customchange handler: inserts elements
 * under the <select> whose value just changed.
 */
export type InsertElementsFn = (
    selectName: string,
    ...elements: Array<ElementObject | React.ReactElement>
) => void;

export type CustomChangeHandler = (
    value: string,
    insertElements: InsertElementsFn
) => void;

// ---------- Structure (programmatic API) ----------

export interface MakeElementConfig {
    name?: string;
    id?: string;
    /** for 'select' */
    placeholder?: string;
    /** for 'options' */
    optionsArray?: Array<{
        value: string;
        text: React.ReactNode;
        makeVisible?: Array<ElementObject | React.ReactElement>;
    }>;
    /** for 'select' */
    customchange?: CustomChangeHandler;
    /** for 'select' */
    label?: string;
    /** for 'option' */
    value?: string;
    /** for 'option' */
    text?: React.ReactNode;
    /** for 'component' */
    component?: React.ReactElement;
}

export class Structure {
    elementsStructure: SelectObject[];
    allOptions: Record<string, OptionObject>;
    makeElement(elementType: 'select', config: MakeElementConfig): SelectObject;
    makeElement(elementType: 'option', config: MakeElementConfig): OptionObject;
    makeElement(elementType: 'options', config: MakeElementConfig): OptionObject[];
    makeElement(elementType: 'component', config: MakeElementConfig): ComponentObject;
    addOptionsToSelect(fatherSelect: SelectObject, childsOptions: OptionObject[]): void;
    linkElementWithTriggerOption(
        element: ElementObject | React.ReactElement | Array<ElementObject | React.ReactElement>,
        triggerOption: string | OptionObject
    ): void;
    savePrincipalSelects(...principalSelects: SelectObject[]): SelectObject[];
}

// ---------- components ----------

export interface NestedSelectsProps {
    /** required callback that receives the current values of all rendered selects/components */
    getvalues: (values: Record<string, unknown>) => void;
    /** structure built by hand or with the Structure API; alternative to children */
    selects?: SelectObject[];
    children?: React.ReactNode;
}

export class NestedSelects extends React.Component<NestedSelectsProps> {}

export interface SelectProps {
    /** name or id is mandatory */
    name?: string;
    id?: string;
    label?: string;
    placeholder?: string;
    customchange?: CustomChangeHandler;
    children?: React.ReactNode;
}

export function Select(props: SelectProps): React.ReactElement | null;

export interface OptionProps {
    value: string;
    children?: React.ReactNode;
}

export function Option(props: OptionProps): React.ReactElement | null;

export interface MakeVisibleProps {
    children?: React.ReactNode;
}

export function MakeVisible(props: MakeVisibleProps): React.ReactElement | null;
