import EntryEntity from '../EntryEntity';
import get from 'lodash.get';

export default class EntryListTransformer {
  public parseEntireList(json: string): EntryEntity[] {
    const list = get(JSON.parse(json), 'list', []);
    return list.map((entity: any) => EntryListTransformer.parseEntity(entity));
  }

  public formatEntireList(list: EntryEntity[]): string {
    const json: Object[] = list.map((entity: EntryEntity) => EntryListTransformer.formatEntity(entity));
    return JSON.stringify({list: json});
  }

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
}
