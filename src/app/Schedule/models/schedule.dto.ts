export class ScheduleDTO {
  id!: number;
  medication_id!: number;
  start_date: Date;
  end_date!: Date;
  frequency!: string;
  cron_expression!: string;
  created_at!: Date;
  updated_at!: Date;

  constructor(start_date: Date) {
    this.start_date = start_date;
  }
}
