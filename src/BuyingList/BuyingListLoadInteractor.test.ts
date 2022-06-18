import BuyingListLoadInteractor, {Response} from './BuyingListLoadInteractor';
import EntryEntity from '../ShoppingList/EntryEntity';
import ListStorage from './ListStorage/ListStorage';
import Memory from '../Navigation/Memory/Memory';
import {mock, MockProxy} from 'jest-mock-extended';
import LoadListTask from './InteractorTask/LoadListTask';
import FormMemory from '../PrimaryInput/FormMemory/FormMemory';

describe(BuyingListLoadInteractor, function () {
    let interactor: BuyingListLoadInteractor,
        listStorage: ListStorage,
        navigationMemory: Memory & MockProxy<Memory>,
        loadingTask: LoadListTask & MockProxy<LoadListTask>,
        formMemory: FormMemory & MockProxy<FormMemory>
    ;

    beforeEach(function () {
        listStorage = mock<ListStorage>();
        navigationMemory = mock<Memory>();
        loadingTask = mock<LoadListTask>();
        formMemory = mock<FormMemory>();

        interactor = new BuyingListLoadInteractor(navigationMemory, [loadingTask, loadingTask], formMemory);
    });

    it('should load and sort the entire list and return through the response model', function () {
        const entry1: EntryEntity = new EntryEntity();
        entry1.name = 'flour';
        const entry2: EntryEntity = new EntryEntity();
        entry2.name = 'apple';
        const entry3: EntryEntity = new EntryEntity();
        entry3.name = 'Äpfel';
        const entry4: EntryEntity = new EntryEntity();
        entry4.name = 'flour';
        const entireList: EntryEntity[] = [entry1, entry3, entry4, entry2];

        navigationMemory.getActiveTab.mockReturnValueOnce('test::activeList:');
        loadingTask.support.mockReturnValueOnce(false);
        loadingTask.support.mockReturnValueOnce(true);
        loadingTask.loadList.mockReturnValueOnce(entireList);
        formMemory.readInputValue.mockReturnValueOnce(' p ');

        const response: Response = interactor.loadActiveList();

        expect(navigationMemory.getActiveTab).toBeCalled();
        expect(loadingTask.support).toBeCalledWith('test::activeList:');
        expect(loadingTask.loadList).toBeCalledTimes(1);
        expect(response.fullList).toEqual([entry3, entry2, entry1, entry4]);
        expect(response.activeList).toEqual([entry3, entry2]);
    });
});
