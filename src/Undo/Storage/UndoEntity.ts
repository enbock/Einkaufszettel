import {EntryId} from '../../ShoppingList/EntryEntity';

export enum Actions {
    NONE,
    RENAME,
    MOVE_TO_LIST
}

export default class UndoEntity {
    public action: Actions = Actions.NONE;
    public entryId: EntryId = '';
    public oldValue: string = '';
    public newValue: string = '';
}
