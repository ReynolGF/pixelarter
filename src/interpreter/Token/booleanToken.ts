import type { Token } from "./token";

export class BooleanToken implements Token {
  readonly text: string;
  readonly type: string;
  constructor(text: string, type: string) {
    this.text = text;
    this.type = type;
  }
}
