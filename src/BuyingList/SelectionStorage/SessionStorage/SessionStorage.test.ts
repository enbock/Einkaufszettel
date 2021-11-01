import SessionStorage from './SessionStorage';
import {mock, MockProxy} from 'jest-mock-extended';

describe(SessionStorage, function () {
  let selectionStorage: SessionStorage,
    storage: Storage & MockProxy<Storage>
  ;

  beforeEach(function () {
    storage = mock<Storage>();
    selectionStorage = new SessionStorage(storage);
  });

  it('should store and get the id of the selected entry', function () {
    storage.getItem.mockReturnValueOnce(null);
    storage.getItem.mockReturnValueOnce('test::stored-id:');

    expect(selectionStorage.getSelectedEntry()).toBe('');
    selectionStorage.saveSelectedEntry('test::new-id:');

    const result = selectionStorage.getSelectedEntry();
    expect(storage.getItem).toBeCalledWith('selected-entry');
    expect(storage.setItem).toBeCalledWith('selected-entry', 'test::new-id:');
    expect(result).toBe('test::stored-id:');
  });
});
