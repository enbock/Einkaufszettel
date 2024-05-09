import DownloadClient from 'Core/Setting/DownloadClient';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import Encoder from 'Infrastructure/Setting/DownloadClient/Browser/Encoder';

export default class Browser implements DownloadClient {
    constructor(
        private encoder: Encoder,
        private document: Document
    ) {
    }

    download(entireList: Array<EntryEntity>, shoppingList: Array<EntryEntity>): void {
        const json: string = this.encoder.encode(entireList, shoppingList);

        const blob: Blob = new Blob([json], {type: 'application/json'});
        const url: string = URL.createObjectURL(blob);
        const a: HTMLAnchorElement = this.document.createElement('a');
        a.href = url;
        a.download = 'download.json';
        this.document.body.appendChild(a);
        a.click();
        this.document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}
