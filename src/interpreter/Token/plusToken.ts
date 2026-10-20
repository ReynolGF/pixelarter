import type { Token } from "./Token";

export class PlusToken implements Token {
  readonly text: string;
  constructor(text: string) {
    this.text = text;
  }
}
