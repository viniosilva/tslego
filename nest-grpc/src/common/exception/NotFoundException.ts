export class NotFoundException extends Error {
  constructor(readonly message: string) {
    super(message);
  }
}
