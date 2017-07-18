export class CurrentMetier {
    "@id": string;
    "@type": string;
    id: number;
    code: string;
    name: string;
    remoteId: number;
    illustration: string;
    description: string;
    synonymes: [string];
    evaluations: [string];
    evaluationsSituationTravailRisque: [string];
    organizationId: number;
    isRepository: boolean;
    situationsTravails: [string];
    activites: [string]
}
