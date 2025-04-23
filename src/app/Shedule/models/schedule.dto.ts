export class ScheduleDTO {
  id!: number;
  medication_id!: string;
  start_date: Date;
  end_date: Date;
  frequency!: string;
  cron_expression!: string;
  disabled!: boolean;
  created_at!: Date;
  updated_at!: Date;
  hour: number;
  minute: number;

  constructor(start_date: Date) {
    this.start_date = start_date;
  }
}
