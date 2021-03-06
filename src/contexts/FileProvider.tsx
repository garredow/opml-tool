import { h, createContext, VNode } from 'preact';
import { route } from 'preact-router';
import { useContext, useState } from 'preact/hooks';
import { ComponentBaseProps, OpmlFile } from '../models';
import { deleteFile, openAndParseFile, saveFile } from '../services/files';
import { convertFileToXMLString } from '../utils/xml';

type FileContextValue = {
  data: OpmlFile | null;
  open: (filePath: string) => Promise<void>;
  update: (file: OpmlFile) => void;
  revertChanges: () => void;
  save: () => Promise<void>;
  close: () => void;
  delete: () => Promise<void>;
  create: (fileName?: string, file?: OpmlFile) => Promise<void>;
};

const defaultValue: FileContextValue = {
  data: null,
  open: () => Promise.resolve(),
  update: () => Promise.resolve(),
  revertChanges: () => Promise.resolve(),
  save: () => Promise.resolve(),
  close: () => Promise.resolve(),
  delete: () => Promise.resolve(),
  create: () => Promise.resolve(),
};

const FileContext = createContext<FileContextValue>(defaultValue);

type FileProviderProps = ComponentBaseProps;

export function FileProvider(props: FileProviderProps): VNode {
  const [originalData, setOriginalData] = useState<OpmlFile | null>(null);
  const [data, setData] = useState<OpmlFile | null>(null);

  async function create() {
    const { storageName } = (navigator as any).getDeviceStorage('sdcard');
    const filePath = `/${storageName}/feeds_${new Date().valueOf()}.opml`;
    const file = {
      filePath: filePath,
      title: 'My Feeds',
      dateCreated: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      ownerName: null,
      ownerEmail: null,
      feeds: [],
    };
    await saveFile(
      filePath,
      new Blob([convertFileToXMLString(file)], { type: 'text/xml' })
    );

    setOriginalData(file);
    setData(file);
  }

  async function open(filePath: string) {
    const file = await openAndParseFile(filePath);

    setOriginalData(file);
    setData(file);
  }

  function update(changedFile: OpmlFile) {
    setData(changedFile);
  }

  function revertChanges() {
    setData(originalData);
  }

  function close() {
    setOriginalData(null);
    setData(null);
    route('/files');
  }

  async function save() {
    if (!data || !originalData) return;

    const fileName = data.filePath;
    const backupFileName = `${fileName}.opmltbackup`;

    // Backup original file
    const origXml = convertFileToXMLString(originalData);
    await saveFile(backupFileName, new Blob([origXml], { type: 'text/xml' }));
    await deleteFile(fileName);

    // Save new file
    const newXml = convertFileToXMLString(data);
    await saveFile(fileName, new Blob([newXml], { type: 'text/xml' }));

    // Cleanup
    await deleteFile(backupFileName);
  }

  async function delete1() {
    console.log('delete file');
  }

  return (
    <FileContext.Provider
      value={{
        data,
        create: create,
        open: open,
        update: update,
        revertChanges,
        close: close,
        save: save,
        delete: delete1,
      }}
    >
      {props.children}
    </FileContext.Provider>
  );
}

export function useFile(): FileContextValue {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFile must be used within a FileProvider');
  }
  return context;
}
