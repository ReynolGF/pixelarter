import { useState } from "react";
import "./App.css";
import { Lexer } from "./interpreter/lexer";
import type { Token } from "./interpreter/Token/token";
import { Parser } from "./interpreter/parser";
import type { Expression } from "./interpreter/Expression/expression";

function App() {
  const textInput = "1+2+24-24-3";

  const [tokens, setTokens] = useState<Token[]>([]);
  const [ast, setAst] = useState<Expression>();
  const [result, setResult] = useState();

  const compile = () => {
    let lexer = new Lexer(textInput);

    let Tokens = lexer.getTokens();
    console.log(Tokens);

    let parser = new Parser(Tokens);

    let Ast = parser.Parse();

    console.log(Ast);

    let result = Ast.evaluate();

    console.log(result);

    setTokens(Tokens);
    setAst(Ast);
    setResult(result);
  };

  return (
    <>
      {tokens.map((token, i) => (
        <h1 key={i}>
          <strong> {token.text} </strong> {token.type}
        </h1>
      ))}
      <h1>{result}</h1>

      <button onClick={compile}>Compile</button>
    </>
  );
}

export default App;
