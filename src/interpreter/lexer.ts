import { BooleanToken } from "./Token/booleanToken";
import { EndLineToken } from "./Token/endLineToken";
import { InvalidToken } from "./Token/invalidToken";
import { MinusToken } from "./Token/minusToken";
import { NumberToken } from "./Token/numberToken";
import { PlusToken } from "./Token/plusToken";
import type { Token } from "./Token/token";
import { isDigit, isLetter } from "./utils";

export class Lexer {
  private readonly text: string;
  private pos: number = 0;

  private getCurrent = () =>
    this.pos >= this.text.length ? "\0" : this.text[this.pos];

  constructor(text: string) {
    this.text = text;
  }

  public getTokens(): Token[] {
    let tokens: Token[] = [];

    while (this.pos <= this.text.length) {
      tokens.push(this.getToken());
      this.pos++;
    }
    return tokens;
  }

  private getToken(): Token {
    if (this.pos >= this.text.length)
      return new EndLineToken("\n", "EndLineToken");

    while (this.getCurrent() == " ") {
      this.pos++;
    }

    if (isDigit(this.getCurrent())) {
      let num = "";

      do {
        num += this.getCurrent();
        this.pos++;
      } while (isDigit(this.getCurrent()));

      this.pos--;

      return new NumberToken(num, "NumberToken");
    }
    if (isLetter(this.getCurrent())) {
      let word = "";
      do {
        word += this.getCurrent();
        this.pos++;
      } while (isLetter(this.getCurrent()));

      this.pos--;

      switch (word) {
        case "true":
          return new BooleanToken("true", "BooleanToken");
        case "false":
          return new BooleanToken("false", "BooleanToken");
        default:
          return new InvalidToken(word, "InvalidToken");
      }
    }

    switch (this.getCurrent()) {
      case "+":
        return new PlusToken("+", "PlusToken");
      case "-":
        return new MinusToken("-", "MinusToken");
      default:
        return new InvalidToken(this.getCurrent(), "InvalidToken");
    }
  }
}
