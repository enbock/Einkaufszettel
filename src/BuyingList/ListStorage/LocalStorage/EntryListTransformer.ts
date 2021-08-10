import EntryEntity from '../EntryEntity';
import get from 'lodash.get';

export default class EntryListTransformer {
  private static parseEntity(entity: any): EntryEntity {
    const entryEntity: EntryEntity = new EntryEntity();
    entryEntity.id = get(entity, 'id', '');
    entryEntity.name = get(entity, 'name', '');
    return entryEntity;
  }

  private static formatEntity(entity: EntryEntity): Object {
    return {
      id: entity.id,
      name: entity.name
    };
  }

  public parseList(json: string): EntryEntity[] {
    const list = get(JSON.parse(json), 'list', []);
    return list.map((entity: any) => EntryListTransformer.parseEntity(entity));
  }

  public formatList(list: EntryEntity[]): string {
    const json: Object[] = list.map((entity: EntryEntity) => EntryListTransformer.formatEntity(entity));
    return JSON.stringify({list: json});
  }
}
