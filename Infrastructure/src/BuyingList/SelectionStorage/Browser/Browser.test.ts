import Browser from './Browser';

describe('Browse', function (): void {
    let selectionStorage: Browser,
        storage: Mocked<Storage>
    ;

    beforeEach(function (): void {
        storage = mock<Storage>();
        selectionStorage = new Browser(storage);
    });

    it('should store and get the id of the selected entry', async function (): Promise<void> {
        storage.getItem.and.returnValues(null, 'test::stored-id:');

        expect(selectionStorage.getSelectedEntry()).toBe('');
        selectionStorage.saveSelectedEntry('test::new-id:');

        const result = selectionStorage.getSelectedEntry();
        expect(storage.getItem).toHaveBeenCalledWith('selected-entry');
        expect(storage.setItem).toHaveBeenCalledWith('selected-entry', 'test::new-id:');
        expect(result).toBe('test::stored-id:');
    });
});
