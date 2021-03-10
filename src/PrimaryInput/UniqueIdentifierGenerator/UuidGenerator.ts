import UniqueIdentifierGenerator from './UniqueIdentifierGenerator';

export default class UuidGenerator implements UniqueIdentifierGenerator {
  private readonly uuidVersion4: Function;

  constructor(uuidVersion4: Function) {
    this.uuidVersion4 = uuidVersion4;
  }

  public generate(): string {
    return this.uuidVersion4();
  }
}
