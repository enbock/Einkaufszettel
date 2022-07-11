import Memory from './Memory';
import UndoEntity from '../../UndoEntity';

describe(Memory, function () {
    let storage: Memory;

    beforeEach(function () {
        storage = new Memory();
    });

    it('should add and removes and undo item', async function () {
        expect(storage.hasItems()).toBeFalsy();
        const item: UndoEntity = new UndoEntity();
        item.entryId = 'test::id:';
        storage.appendChange(item);

        expect(storage.hasItems()).toBeTruthy();
        expect(storage.popLastItem()).toBe(item);
        expect(storage.hasItems()).toBeFalsy();
    });

    it('should give an empty item it list is empty', async function () {
        expect(storage.popLastItem()).toEqual(new UndoEntity());
    });
});
