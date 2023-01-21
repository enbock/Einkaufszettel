type ThrowsErrorOrReturn<E extends Error, T> = T;
type ThrowsError<E extends Error> = void;
type Callback<Function = (() => void)> = Function;
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
