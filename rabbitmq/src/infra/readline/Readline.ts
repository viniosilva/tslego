import readline, { Interface } from 'readline';

export class Readline {
  private readonly interface: Interface;

  constructor() {
    this.interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async question(text: string): Promise<string> {
    return new Promise((resolve) => {
      this.interface.question(`${text} `, (answer) => resolve(answer));
    });
  }

  close(): void {
    this.interface.close();
  }
}
