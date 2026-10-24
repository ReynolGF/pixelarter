import type { Expression } from "./expression";

export class BooleanExpression implements Expression {
  private readonly bool: boolean;

  public evaluate = () => this.bool;

  constructor(bool: boolean) {
    this.bool = bool;
  }
}
