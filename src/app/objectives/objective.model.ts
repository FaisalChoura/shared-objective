export class Objective {
  constructor(
    public title: string,
    public tasks: Task[],
    public ownerId: string,
    public id?: string
  ) {}
}

export class Task {
  constructor(
    public title: string,
    public description: string,
    public objectiveId: string,
    public ownerId: string,
    public id?: string
  ) {}
}
