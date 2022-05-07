import RootView from './RootView';

export default interface Controller {
    attach(view: RootView): void;
}
