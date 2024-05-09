import RootView from './RootView';

export default interface ViewAttachedController {
    attach(view: RootView): Promise<void>;
}
