import type { Expression } from "./expression";

export class ErrorExpression implements Expression {
  private readonly message: string;
  public evaluate = () => this.message;
  constructor(message: string) {
    this.message = message;
  }
}
