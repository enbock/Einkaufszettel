import EntryEntity from './ListStorage/EntryEntity';
import StringUmlautHelper from '../Helper/StringUmlautHelper';
import Memory from '../Navigation/Memory/Memory';
import {TabId} from '../Navigation/TabEntity';
import LoadListTask from './ListStorage/LoadList/LoadListTask';

export class Response {
  public activeList: EntryEntity[] = [];
}

export default class BuyingListLoadInteractor {
  private readonly loadListChain: LoadListTask[];
  private readonly navigationMemory: Memory;

  constructor(navigationMemory: Memory, loadListChain: LoadListTask[]) {
    this.loadListChain = loadListChain;
    this.navigationMemory = navigationMemory;
  }

  private static sortList(entireList: EntryEntity[]): EntryEntity[] {
    return entireList.sort(BuyingListLoadInteractor.compareNames);
  }

  private static compareNames(a: EntryEntity, b: EntryEntity): number {
    const upperA: string = StringUmlautHelper.replaceUmlaut(a.name).toUpperCase();
    const upperB: string = StringUmlautHelper.replaceUmlaut(b.name).toUpperCase();
    if (upperA < upperB) {
      return -1;
    }
    if (upperA > upperB) {
      return 1;
    }

    return 0;
  }

  public loadActiveList(): Response {
    const activeTab: TabId = this.navigationMemory.getActiveTab();
    let activeList: EntryEntity[] = [];
    let loadTask: LoadListTask;

    for (loadTask of this.loadListChain) {
      if (loadTask.support(activeTab) === false) continue;
      activeList = loadTask.loadList();
    }

    const response: Response = new Response();
    response.activeList = BuyingListLoadInteractor.sortList(activeList);
    return response;
  }
}
