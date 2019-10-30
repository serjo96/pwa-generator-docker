
interface StageOneInterface {
    appName: string;
    shortAppName: string;
    imageName: string;
    appLogo: File | null;
    ratingNumbers: string;
    ratingCount: string;
    developerName: string;
    developerEmail: string;
    developerSite: string;
    appSize: string;
    appVersion: string;
    ageRestrictions: string;
    appInstallCount: string;
    categorySelect: string;
}

interface StageTwoInterface {
    oneStar: string;
    twoStar: string;
    threeStar: string;
    fourStar: string;
    fiveStar: string;
}
interface StageThreeInterface {
    lastAppChanges: string;
    fullAppDescription: string;
    shortDescription: string;
}

interface StageFourInterface {
    linkToPWA: string;
    languagePWA: string;
    backgroundPWA: string;
    iconSmallName: string;
    iconSmallPWA: File | null;
    iconMiddleName: string;
    iconMiddlePWA: File | null;
}

interface StageFiveInterface {
    name: string;
    file: File | null;
    index: number;
}
interface StageSixInterface {
    name: string;
    authorName: string;
    authorLastName: string;
    starCount: string;
    likesCount: string;
    text: string;
    avatar: {
        name: string;
        file: null | File;
    };
}

export interface FormDataInterface {
    stageOne: StageOneInterface;
    stageTwo: StageTwoInterface;
    stageThree: StageThreeInterface;
    stageFour: StageFourInterface;
    stageFive: StageFiveInterface[];
    stageSix: StageSixInterface[];
}
