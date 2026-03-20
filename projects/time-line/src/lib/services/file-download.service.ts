import { Injectable } from '@angular/core';
import { DownloadInformation } from '../classes/DownloadInformation';

@Injectable({
    providedIn: 'root',
})
export class FileDownloadService {

    downloadFiles(downloads: DownloadInformation[]) {
        downloads.forEach((download) => {
            const a = document.createElement("a");
            a.href = `${download.path}.pdf`;
            // ToDo: use correct language for label
            a.download = `${download.label.en}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }
}
