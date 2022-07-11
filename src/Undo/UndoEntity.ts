import {EntryId} from '../ShoppingList/EntryEntity';

export enum Actions {
    NONE,
    RENAME,
    MOVE_TO_LIST,
    REMOVE_FROM_LIST,
    DELETE,
    CREATE
}

export default class UndoEntity {
    public action: Actions = Actions.NONE;
    public target: string = '';
    public entryId: EntryId = '';
    public oldValue: string = '';
    public newValue: string = '';
}
