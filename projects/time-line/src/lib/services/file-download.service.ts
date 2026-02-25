import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FileDownloadService {

    downloadFiles(downloads: string[]) {
        downloads.forEach((downloadUrl, index) => {
            const urlParts = downloadUrl.split("/");
            const a = document.createElement("a");
            a.href = `${downloadUrl}.pdf`;
            a.download = `${urlParts[urlParts.length - 1]}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }
}
