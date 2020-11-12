class Hello {
  getMessage(): string {
    return 'Hello world! (:';
  }
}

export const hello = new Hello();

console.log(hello.getMessage());
