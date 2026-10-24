import { BinaryMinusExpression } from "./Expression/BinaryExpression/binaryMinusExpression";
import { BinarySumExpression } from "./Expression/BinaryExpression/binarySumExpression";
import { BooleanExpression } from "./Expression/booleanExpression";
import { ErrorExpression } from "./Expression/errorExpression";
import type { Expression } from "./Expression/expression";
import { NumberExpression } from "./Expression/numberExpression";
import type { Token } from "./Token/token";

export class Parser {
  private readonly tokens: Token[];

  private pos: number = 0;
  private getCurrent = (): Token => {
    return this.tokens[this.pos];
  };
  private nextToken = (): void => {
    this.pos++;
  };
  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }
  public Parse(): Expression {
    console.log(this.getCurrent());
    let left: Expression = this.E(this.getCurrent());
    console.log(this.getCurrent());

    while (
      this.getCurrent().type == "PlusToken" ||
      this.getCurrent().type == "MinusToken"
    ) {
      let currentOperator = this.getCurrent();

      this.nextToken();

      console.log(this.getCurrent());

      let right: Expression = this.E(this.getCurrent());

      console.log(this.getCurrent());

      if (currentOperator.type == "PlusToken") {
        left = new BinarySumExpression(left, right);
      }

      if (currentOperator.type == "MinusToken") {
        left = new BinaryMinusExpression(left, right);
      }
    }
    return left;
  }

  private E(currentToken: Token): Expression {
    this.nextToken();

    if (currentToken.type == "NumberToken")
      return new NumberExpression(Number(currentToken.text));
    if (currentToken.type == "BooleanToken")
      return new BooleanExpression(Boolean(currentToken.text));
    if (currentToken.type == "InvalidToken")
      return new ErrorExpression("SINTAXERROR: Token Invalido");

    return new ErrorExpression("SINTAXERROR: Token no reconocido");
  }
}
