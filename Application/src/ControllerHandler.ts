export type PresentDataCallback = Callback;

export default interface ControllerHandler {
    initialize(presentData: PresentDataCallback): Promise<void>;
}
