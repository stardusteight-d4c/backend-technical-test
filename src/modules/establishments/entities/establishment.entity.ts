export enum EstablishmentType {
  SHOPPING = 'shopping',
  LOCAL = 'local',
}

export class Establishment {
  id: string;
  name: string;
  ownerId: string;
  type: EstablishmentType;
}
