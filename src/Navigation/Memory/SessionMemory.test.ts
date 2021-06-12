import SessionMemory from './SessionMemory';
import {mock, MockProxy} from 'jest-mock-extended';
import {SystemTabs, TabId} from '../TabEntity';

describe(SessionMemory, function () {
  let memory: SessionMemory,
    sessionStorage: Storage & MockProxy<Storage>
  ;

  beforeEach(function () {
    sessionStorage = mock<Storage>();
    memory = new SessionMemory(sessionStorage);
  });

  it('should can store new active tab', function () {
    memory.storeActiveTab('test::newId:');
    expect(sessionStorage.setItem).toBeCalledWith(SessionMemory.storeKey, 'test::newId:');
  });

  it('should can load active tab', function () {
    sessionStorage.getItem.mockReturnValueOnce('test::storedId:');

    const result: TabId = memory.getActiveTab();

    expect(sessionStorage.getItem).toBeCalledWith(SessionMemory.storeKey);
    expect(result).toBe('test::storedId:');
  });

  it('should return entireList as default if storage empty', function () {
    sessionStorage.getItem.mockReturnValueOnce(null);

    const result: TabId = memory.getActiveTab();

    expect(sessionStorage.getItem).toBeCalledWith(SessionMemory.storeKey);
    expect(result).toBe(SystemTabs.EntireList);
  });
});
