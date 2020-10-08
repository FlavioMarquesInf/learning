export interface User {
    uid: string,
    fullName: string,
    email: string,
    profilePocture: string,
    locationDate: string,
    location: {
        lat: number,
        lng: number
    }
}