import { ScheduleDTO } from '../../Schedule/models/schedule.dto';

export class MedicationDTO {
  id!: number;
  user_id!: string;
  disabled!: boolean;
  created_at!: Date;
  updated_at!: Date;
  name: string;
  schedules!: ScheduleDTO[];

  constructor(name: string) {
    this.name = name;
  }
}
