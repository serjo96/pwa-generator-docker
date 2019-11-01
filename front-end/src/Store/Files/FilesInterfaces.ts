export interface FilesPayloadInterface {
    file: File;
    name: string;
    dimension: number[];
    extension: string[];
}

export interface FilesActionPayloadInterface  extends  FilesPayloadInterface {
    appUID: string;
}
