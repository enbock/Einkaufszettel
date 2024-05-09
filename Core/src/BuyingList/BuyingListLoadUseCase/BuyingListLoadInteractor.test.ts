import BuyingListLoadInteractor, {Response} from './BuyingListLoadInteractor';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import StateStorage from 'Core/Navigation/StateStorage';
import LoadListTask from 'Core/BuyingList/ListUseCase/Task/LoadListTask';
import FormMemory from 'Core/PrimaryInput/FormMemory/FormMemory';

describe('BuyingListLoadInteractor', function (): void {
    let interactor: BuyingListLoadInteractor,
        navigationMemory: Mocked<StateStorage>,
        loadingTask: Mocked<LoadListTask>,
        formMemory: Mocked<FormMemory>
    ;

    beforeEach(function (): void {
        navigationMemory = mock<StateStorage>();
        loadingTask = mock<LoadListTask>();
        formMemory = mock<FormMemory>();

        interactor = new BuyingListLoadInteractor(navigationMemory, [loadingTask, loadingTask], formMemory);
    });

    it('should load and sort the entire list and return through the response model', async function (): Promise<void> {
        const entry1: EntryEntity = new EntryEntity();
        entry1.name = 'flour';
        const entry2: EntryEntity = new EntryEntity();
        entry2.name = 'apple';
        const entry3: EntryEntity = new EntryEntity();
        entry3.name = 'Äpfel';
        const entry4: EntryEntity = new EntryEntity();
        entry4.name = 'flour';
        const entireList: EntryEntity[] = [entry1, entry3, entry4, entry2];

        navigationMemory.getActiveTab.and.returnValue('test::activeList:');
        loadingTask.support.and.returnValues(false, true);
        loadingTask.loadList.and.returnValue(entireList);
        formMemory.readInputValue.and.returnValue(' p ');

        const response: Response = interactor.loadActiveList();

        expect(navigationMemory.getActiveTab).toHaveBeenCalled();
        expect(loadingTask.support).toHaveBeenCalledWith('test::activeList:');
        expect(loadingTask.loadList).toHaveBeenCalledTimes(1);
        expect(response.fullList).toEqual([entry3, entry2, entry1, entry4]);
        expect(response.activeList).toEqual([entry3, entry2]);
    });
});
