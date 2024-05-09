import {TabId} from 'Core/Navigation/TabEntity';

export default class TabModel {
    public isActive: boolean = false;
    public name: TabId = '';
    public label: string = '';
}
