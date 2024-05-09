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
declare module '*.svg' {
    const content: any;
    export default content;
}

declare module process {
    const env: { [key: string]: string };
}
