export class MedicationDTO {
  medicationId!: number;
  userId!: string;
  disabled!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
