import RootView from './RootView';

/**
 * @deprecated Refactor to ModuleController
 */
export default interface ViewAttachedController {
    attach(view: RootView): Promise<void>;
}
