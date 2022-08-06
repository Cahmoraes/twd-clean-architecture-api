export class InvalidNameError extends Error {
  public readonly name: string

  constructor (name: string) {
    super(`Invalid name: ${name}.`)
    this.name = 'InvalidNameError'
  }
}
