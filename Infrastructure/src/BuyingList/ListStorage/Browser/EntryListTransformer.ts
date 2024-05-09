import ParseHelper from 'Core/ParseHelper';
import EntryEntity from 'Core/ShoppingList/EntryEntity';

export default class EntryListTransformer {
    constructor(
        private parseHelper: ParseHelper
    ) {
    }

    public parseList(json: string): EntryEntity[] {
        const list = this.parseHelper.get(JSON.parse(json), 'list', []);
        return list.map((entity: any) => this.parseEntity(entity));
    }

    public formatList(list: EntryEntity[]): string {
        const json: Object[] = list.map((entity: EntryEntity) => this.formatEntity(entity));
        return JSON.stringify({list: json});
    }

    private parseEntity(entity: any): EntryEntity {
        const entryEntity: EntryEntity = new EntryEntity();
        entryEntity.id = this.parseHelper.get(entity, 'id', '');
        entryEntity.name = this.parseHelper.get(entity, 'name', '');
        return entryEntity;
    }

    private formatEntity(entity: EntryEntity): Object {
        return {
            id: entity.id,
            name: entity.name
        };
    }
}
