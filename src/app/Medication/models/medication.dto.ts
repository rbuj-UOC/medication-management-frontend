export class MedicationDTO {
  id!: number;
  user_id!: string;
  disabled!: boolean;
  created_at!: Date;
  updated_at!: Date;
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
