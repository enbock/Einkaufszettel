type throwsErrorOrReturn<E extends Error, T> = T;
type throwsError<E extends Error> = void;
type Callback<Function> = any;
type MockedObject = any;

type Factorizable<T> = {
    factory(...args: any[]): T
}

declare namespace JSX {
    type Element = any;

    interface IntrinsicElements {
        [tag: string]: Element;
    }
}

declare module '*.css' {
    const content: any;
    export default content;
}
