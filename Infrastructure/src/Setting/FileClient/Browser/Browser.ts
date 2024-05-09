import FileClient, {ImportDto} from 'Core/Setting/FileClient';
import EntryEntity from 'Core/ShoppingList/EntryEntity';
import Encoder from 'Infrastructure/Setting/FileClient/Browser/Encoder';
import Parser from 'Infrastructure/Setting/FileClient/Browser/Parser';

export default class Browser implements FileClient {
    constructor(
        private encoder: Encoder,
        private document: Document,
        private parser: Parser,
        private fileReader: typeof FileReader
    ) {
    }

    public download(entireList: Array<EntryEntity>, shoppingList: Array<EntryEntity>): void {
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

    public load(file: File): Promise<ImportDto> {
        return new Promise((resolve, reject): void => {
            const reader: FileReader = new this.fileReader();

            reader.onload = (event: ProgressEvent<FileReader>): void => {
                if (event.target?.result) {
                    const fileContent: string = event.target.result.toString();
                    const importDto: ImportDto = this.parser.parseJson(fileContent);
                    resolve(importDto);
                } else {
                    reject(new Error('Failed to read file.'));
                }
            };

            reader.readAsText(file);
        });
    }
}
