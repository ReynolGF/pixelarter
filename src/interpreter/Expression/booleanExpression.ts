import type { Expression } from "./expression";

export class BooleanExpression implements Expression {
  public readonly bool: boolean;

  constructor(bool: boolean) {
    this.bool = bool;
  }
}
