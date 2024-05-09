import EntryEntity from 'Core/ShoppingList/EntryEntity';
import StateStorage from 'Core/Navigation/StateStorage';
import {TabId} from 'Core/Navigation/TabEntity';
import LoadListTask from 'Core/BuyingList/ListUseCase/Task/LoadListTask';
import FormMemory from 'Core/PrimaryInput/FormMemory/FormMemory';
import StringHelper from 'Core/StringHelper';

export class Response {
    public activeList: EntryEntity[] = [];
    public fullList: EntryEntity[] = [];
}

export default class BuyingListLoadInteractor {
    constructor(
        private navigationMemory: StateStorage,
        private loadListChain: LoadListTask[],
        private formMemory: FormMemory
    ) {
    }

    public loadActiveList(): Response {
        const activeTab: TabId = this.navigationMemory.getActiveTab();
        let activeList: EntryEntity[] = [];
        let loadTask: LoadListTask;
        const search: string = StringHelper.replaceUmlaut(this.formMemory.readInputValue().trim()).toLocaleLowerCase();

        for (loadTask of this.loadListChain) {
            if (loadTask.support(activeTab) === false) continue;
            activeList = loadTask.loadList();
        }

        const response: Response = new Response();
        response.fullList = StringHelper.sortList(activeList, 'name') as EntryEntity[];
        response.activeList = response.fullList.filter(
            (entity: EntryEntity): boolean => StringHelper.replaceUmlaut(entity.name)
                .toLocaleLowerCase()
                .indexOf(search) > -1
        );
        return response;
    }
}
