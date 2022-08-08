export class MissingParamError extends Error {
  public readonly name: string

  constructor (param: string) {
    super(`Missing parameter from request: ${param}.`)
    this.name = 'MissingParamError'
  }
}
