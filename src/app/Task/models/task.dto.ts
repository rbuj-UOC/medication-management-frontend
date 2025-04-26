export class TaskDTO {
  key: string;
  next: string;

  constructor(key: string, next: string) {
    this.key = key;
    this.next = next;
  }
}
