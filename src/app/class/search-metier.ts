export class SearchMetier {
    "@id": string;
    "@type": string;
    name: string;
    remoteId: number;
    metier: {
        "@id": string,
        "@type": string,
        "id": number,
        "name": string
    }
}