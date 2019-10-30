export interface FileInterface {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

export interface IconsInterfaces {
    iconSmallPWA: FileInterface | null;
    iconMiddlePWA: FileInterface | null;
}
