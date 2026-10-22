import type { Expression } from "./expression";

export class NumberExpression implements Expression {
  public readonly num: number;

  constructor(num: number) {
    this.num = num;
  }
}
