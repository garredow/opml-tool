import { OpmlFeed, OpmlFile, StorageFile } from '../models';

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = (err): void => {
      reader.abort();
      reject(err);
    };
    reader.onloadend = (res): void => {
      resolve(res.target?.result as string);
    };
    reader.readAsText(file);
  });
}

export function listOPMLFiles(): Promise<StorageFile[]> {
  return new Promise((resolve, reject) => {
    const opmlFiles: StorageFile[] = [];
    var sdcard = (navigator as any).getDeviceStorage('sdcard');
    var cursor = sdcard.enumerate();
    let index = 0;

    cursor.onsuccess = function () {
      if (!this.result) {
        resolve(opmlFiles);
        return;
      }

      const match = this.result.name.match(/([^\/]*\.opml)$/);
      if (match) {
        opmlFiles.push({
          id: `file_${index++}`,
          name: match[0] as string,
          path: this.result.name,
          lastModified: new Date(this.result.lastModified).toISOString(),
        });
      }

      this.continue();
    };

    cursor.onerror = function () {
      reject(this.error);
    };
  });
}

export async function openFile(filePathAndName: string): Promise<File> {
  if (!(navigator as any).getDeviceStorage) {
    console.log('Not running on a real device. Using example data.');
    const exampleData = await fetch('assets/example.opml').then((res) =>
      res.blob()
    );
    return exampleData as File;
  }

  return new Promise((resolve, reject) => {
    const sdcard = (navigator as any).getDeviceStorage('sdcard');
    const request = sdcard.get(filePathAndName);
    request.onsuccess = function (): void {
      resolve(this.result);
    };
    request.onerror = function (): void {
      reject(this.error);
    };
  });
}

export async function openAndParseFile(
  filePathAndName: string
): Promise<OpmlFile> {
  const file = await openFile(filePathAndName);
  const fileText = await readFileAsText(file);
  const xml = new DOMParser().parseFromString(fileText, 'text/xml');

  return {
    filePath: filePathAndName,
    title: xml.querySelector('head>title')?.textContent || null,
    dateCreated: xml.querySelector('head>dateCreated')?.textContent || null,
    dateModified: xml.querySelector('head>dateModified')?.textContent || null,
    ownerName: xml.querySelector('head>ownerName')?.textContent || null,
    ownerEmail: xml.querySelector('head>ownerEmail')?.textContent || null,
    feeds: Array.from(xml.querySelectorAll('outline[xmlUrl]')).map(
      (a, i) =>
        ({
          id: `feed${i}`,
          type: a.getAttribute('type'),
          text: a.getAttribute('text'),
          xmlUrl: a.getAttribute('xmlUrl'),
          description: a.getAttribute('description'),
          htmlUrl: a.getAttribute('htmlUrl'),
          language: a.getAttribute('language'),
          title: a.getAttribute('title'),
          version: a.getAttribute('version'),
        } as OpmlFeed)
    ),
  };
}

export function saveFile(filePathAndName: string, file: Blob): Promise<File> {
  return new Promise((resolve, reject) => {
    var sdcard = (navigator as any).getDeviceStorage('sdcard');
    var request = sdcard.addNamed(file, filePathAndName);
    request.onsuccess = function () {
      resolve(this.result);
    };
    request.onerror = function () {
      reject(this.error);
    };
  });
}

export function deleteFile(filePathAndName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    var sdcard = (navigator as any).getDeviceStorage('sdcard');
    var request = sdcard.delete(filePathAndName);
    request.onsuccess = function () {
      resolve();
    };
    request.onerror = function () {
      reject(this.error);
    };
  });
}
