import type { Token } from "./token";

export class PlusToken implements Token {
  readonly text: string;
  constructor(text: string) {
    this.text = text;
  }
}
