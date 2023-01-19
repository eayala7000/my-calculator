import React, { useState, useCallback } from "react";
import Display from "./Display";
import Buttons from "./Buttons";
import "./styles/Calculator.css";
import { evaluate, round } from "mathjs";

function Calculator() {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");

  //input
  const inputHandler = useCallback((event) => {
    if (answer === "Invalid Input!!") return;
    let val = event.target.innerText;

    let str = input + val;
    if (str.length > 14) return;

    if (answer !== "") {
      setInput(answer + val);
      setAnswer("");
    } else setInput(str);
  }, [input, answer]);

  //Clear screen
  const clearInput = () => {
    setInput("");
    setAnswer("");
  };

  // calculate final answer
  const calculateAns = () => {
    if (input === "") return;
    let result = 0;
    let finalexpression = input;
    finalexpression = finalexpression.replaceAll("×", "*");
    finalexpression = finalexpression.replaceAll("÷", "/");

    result = evaluate(finalexpression);
    isNaN(result) ? setAnswer(result) : setAnswer(round(result, 3));
  };

  // change prefix of expression
  const changePlusMinus = () => {
    //need to change for answer
    if (answer === "Invalid Input!!") return;
    else if (answer !== "") {
      let ans = answer.toString();
      if (ans.charAt(0) === "-") {
        let plus = "+";
        setInput(plus.concat(ans.slice(1, ans.length)));
      } else if (ans.charAt(0) === "+") {
        let minus = "-";
        setInput(minus.concat(ans.slice(1, ans.length)));
      } else {
        let minus = "-";
        setInput(minus.concat(ans));
      }
      setAnswer("");
    } else {
      if (input.charAt(0) === "-") {
        let plus = "+";
        setInput((prev) => plus.concat(prev.slice(1, prev.length)));
      } else if (input.charAt(0) === "+") {
        let minus = "-";
        setInput((prev) => minus.concat(prev.slice(1, prev.length)));
      } else {
        let minus = "-";
        setInput((prev) => minus.concat(prev));
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="main">
          <Display input={input} setInput={setInput} answer={answer} />
          <Buttons
            inputHandler={inputHandler}
            clearInput={clearInput}
            changePlusMinus={changePlusMinus}
            calculateAns={calculateAns}
          />
        </div>
      </div>
    </>
  );
}

export default Calculator;