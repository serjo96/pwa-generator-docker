export interface PushMessagePayloadInterface {
    title: string;
    body: string;
    icon: string;
    'click_action': string;
}

export interface PushMessageActionPayloadInterface {
    message: PushMessagePayloadInterface;
    app: string;
}
