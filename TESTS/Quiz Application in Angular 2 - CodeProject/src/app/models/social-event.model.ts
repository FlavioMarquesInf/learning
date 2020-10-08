export interface SocialEventModel {
    uid?: string;
    title: string;
    coverImage: string;
    position: any;
    description: string;
    category: string;
    userNickname: string;
    userThumbnail: string;
    userDisplayName: string;
    startTime: string;
    endTime: string;
    address: string;
    fullAddress: string;
    tags: string[];
    finished: boolean;

    lat: number;
    lng: number;
}
