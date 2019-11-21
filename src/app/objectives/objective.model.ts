export class Objective {
  constructor(public title: string, public tasks: Task[]) {}
}

export class Task {
  constructor(public title: string, public description: string) {}
}
