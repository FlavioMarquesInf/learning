export interface NewSocialEventModel {
    id?: string;
    uid?: string;
    userName: string;
    userPhoto: string;

    coverImage: string;
    title: string;
    description?: string;
    category: string;
    tags?: string[];

    _tagsStr?: string;
    _imageData?: string;

    lat: number;
    lng: number;

    position: any;

    startTime: string;
    endTime: string;

    access: string; // acesso [público/privado]
    ticketType: string; // tipo de ingresso
    ticketPrice?: number; // preço do ingresso
    refundPolicy?: string; // política de reembolso

    shortAddress?: string;
    fullAddress: string;

    finished: boolean;

}
