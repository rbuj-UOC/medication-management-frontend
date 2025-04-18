export class ScheduleDTO {
  id!: number;
  medication_id!: number;
  start_date: Date;
  end_date!: Date;
  time: Date;
  frequency!: string;
  cron_expression!: string;
  created_at!: Date;
  updated_at!: Date;

  constructor(
    start_date: Date,
    time: Date,
    medication_id: number,
    frequency: string,
    cron_expression: string
  ) {
    this.start_date = start_date;
    this.time = time;
    this.medication_id = medication_id;
    this.frequency = frequency;
    this.cron_expression = cron_expression;
  }
}
