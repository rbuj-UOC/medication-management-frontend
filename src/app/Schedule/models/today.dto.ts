export class TodayDTO {
  start_date: Date;
  medication!: { name: string };

  constructor(start_date: Date) {
    this.start_date = start_date;
  }
}
