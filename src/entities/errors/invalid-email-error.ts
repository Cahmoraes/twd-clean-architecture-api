export class InvalidEmailError extends Error {
  public readonly name: string

  constructor (email: string) {
    super(`Invalid email: ${email}.`)
    this.name = 'InvalidEmailError'
  }
}
