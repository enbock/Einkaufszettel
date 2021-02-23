import EntryEntity from '../EntryEntity';
import get from 'lodash.get';

export default class Parser {
  public parseEntireList(json: string): EntryEntity[] {
    const list = get(JSON.parse(json), 'list', []);
    return list.map((entity: any) => Parser.parseEntity(entity));
  }

  private static parseEntity(entity: any): EntryEntity {
    const entryEntity = new EntryEntity();
    entryEntity.id = get(entity, 'id', '');
    entryEntity.name = get(entity, 'name', '');
    return entryEntity;
  }
}
