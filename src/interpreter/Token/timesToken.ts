import type { Token } from "./token";

export class TimesToken implements Token {
  readonly text: string;
  readonly type: string;
  constructor(text: string, type: string) {
    this.text = text;
    this.type = type;
  }
}
