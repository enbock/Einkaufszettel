import UuidGenerator from './UuidGenerator';

describe(UuidGenerator, function () {
  let uuidVersion4: Function, generator: UuidGenerator;

  beforeEach(function () {
    uuidVersion4 = jest.fn();
    generator = new UuidGenerator(uuidVersion4);
  });

  it('should generate uuid v4', function () {
    const uuidValue: string = 'test::uuid-v4:';

    (uuidVersion4 as jest.Mock).mockReturnValueOnce(uuidValue);

    const result: string = generator.generate();

    expect(result).toEqual(uuidValue);
    expect(uuidVersion4).toBeCalled();
  });
});
