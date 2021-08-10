import StringUmlautHelper from './StringUmlautHelper';

describe(StringUmlautHelper, function () {
  it('should replace umlauts', function () {
    const input: string = 'ÄÖÜẞäöüßâûô';
    const expected: string = 'AEOEUESaeoeuessauo';

    expect(StringUmlautHelper.replaceUmlaut(input)).toBe(expected);
  });
});
