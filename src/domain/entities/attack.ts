export interface AttackParams {
  name: string
  power: number
  id?: number
}

export class Attack {
  public name: string
  public power: number
  public id?: number

  constructor(params: AttackParams) {
    ;(this.name = params.name), (this.power = params.power)
    this.id = params.id
  }
}
