export default interface StageSixInterface {
    name: string;
    authorName: string;
    authorLastName: string;
    starCount: string;
    likesCount: string;
    text: string;
    id: string;
    avatar: {
        name: string;
        nameID: string;
        file: null | File;
    };
}
