export class BadRequestException extends Error {
  constructor(readonly message: string) {
    super(message);
  }
}
