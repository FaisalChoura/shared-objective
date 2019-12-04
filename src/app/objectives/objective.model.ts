export class Objective {
  constructor(public id: string, public title: string, public tasks: Task[]) {}
}

export class Task {
  constructor(
    public title: string,
    public description: string,
    public objectiveId: string,
    public id?: string
  ) {}
}
