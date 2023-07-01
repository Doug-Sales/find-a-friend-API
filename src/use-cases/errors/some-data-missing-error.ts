export class DataMissingError extends Error {
  constructor() {
    super('Data missing or incomplete')
  }
}
