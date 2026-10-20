import { useState } from "react";
import "./App.css";
import { Lexer } from "./interpreter/lexer";
import type { Token } from "./interpreter/Token/Token";

function App() {
  const textInput = "1+4";

  const [result, setResult] = useState<Token[]>([]);

  const compile = () => {
    let lexer = new Lexer(textInput);

    setResult(lexer.getTokens());
  };

  return (
    <>
      {result.map((token) => (
        <h1>{token.text}</h1>
      ))}
      <button onClick={compile}>Compile</button>
    </>
  );
}

export default App;
