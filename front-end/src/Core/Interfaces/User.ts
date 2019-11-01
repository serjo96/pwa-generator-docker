export default interface User {
    displayName?: any;
    email?: any;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata?: void;
    phoneNumber: string | number;
    photoURL?: any;
    providerData?: any;
    providerId?: any;
    refreshToken: string;
    uid?: any;
}
