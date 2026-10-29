import { BinaryDivideByExpression } from "./Expression/BinaryExpression/binaryDivideByExpression";
import { BinaryMinusExpression } from "./Expression/BinaryExpression/binaryMinusExpression";
import { BinarySumExpression } from "./Expression/BinaryExpression/binarySumExpression";
import { BinaryTimesExpression } from "./Expression/BinaryExpression/binaryTimesExpression";
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

  public parse = (): Expression => this.t();

  private t(): Expression {
    let left: Expression = this.f();

    while (
      this.getCurrent().type == "PlusToken" ||
      this.getCurrent().type == "MinusToken"
    ) {
      let currentOperator = this.getCurrent();

      this.nextToken();

      let right: Expression = this.f();

      if (currentOperator.type == "PlusToken") {
        left = new BinarySumExpression(left, right);
      }

      if (currentOperator.type == "MinusToken") {
        left = new BinaryMinusExpression(left, right);
      }
    }
    return left;
  }
  private f(): Expression {
    let left: Expression = this.e(this.getCurrent());

    while (
      this.getCurrent().type == "TimesToken" ||
      this.getCurrent().type == "DivideByToken"
    ) {
      let currentOperator = this.getCurrent();

      this.nextToken();

      let right: Expression = this.e(this.getCurrent());

      if (currentOperator.type == "TimesToken") {
        left = new BinaryTimesExpression(left, right);
      }

      if (currentOperator.type == "DivideByToken") {
        left = new BinaryDivideByExpression(left, right);
      }
    }
    return left;
  }

  private e(currentToken: Token): Expression {
    this.nextToken();
    if (currentToken.type == "OpenParenthesisToken") {
      let expression = this.parse();
      if (this.getCurrent().type != "CloseParenthesisToken") {
        return new ErrorExpression("SINTAXERROR: Se esperaba un )");
      }
      this.nextToken();
      return expression;
    }
    if (currentToken.type == "NumberToken")
      return new NumberExpression(Number(currentToken.text));
    if (currentToken.type == "BooleanToken")
      return new BooleanExpression(Boolean(currentToken.text));
    if (currentToken.type == "InvalidToken")
      return new ErrorExpression("SINTAXERROR: Token Invalido");

    return new ErrorExpression("SINTAXERROR: Token no reconocido");
  }
}
