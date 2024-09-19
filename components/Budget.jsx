import { useState } from "react";
import Button from "@/components/Button";

export default function Budget({ email }) {
  const [currency, setCurrency] = useState("");
  const [budgetSchedule, setBudgetSchedule] = useState("");
  const [budgetAmount, setBudgetAmount] = useState();
  // get local currency or ask? to change

  const listOfCurrencies = ["$", "€", "¥", "£", "₹", "₽"];
  const listOfDate = ["Daily", "Bi-Weekly", "Weekly", "Monthly"];

  const AskCurrency = () => {
    return (
      <div className="">
        <p className="">What's your preferred currency?</p>
        <div className="w-1/6 grid grid-flow-col grid-rows-2">
          {listOfCurrencies.map((symbol, index) => {
            return (
              <button
                key={index}
                className={`transition-all rounded-md m-2 p-3 w-fit ${
                  symbol === currency ? "bg-green-400" : "bg-white"
                } text-black hover:bg-green-400`}
                onClick={() => {
                  setCurrency(symbol);
                }}
              >
                {symbol}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const AskBudgetSchedule = () => {
    return (
      <>
        <p>How often do you want to track?</p>
        <div>
          {listOfDate.map((type, index) => {
            return (
              <Button text={type} onClick={() => setBudgetSchedule(type)} />
            );
          })}
        </div>
      </>
    );
  };

  const AskBudgetAmount = () => {
    return (
      <>
        <p className="">What's your budget?</p>
        <Button
          text={`${currency}100`}
          otherStyles=""
          onClick={() => setBudgetAmount(100)}
        />
        <Button
          text={`${currency}200`}
          otherStyles=""
          onClick={() => setBudgetAmount(200)}
        />
        <div className="inline bg-white text-black px-4 py-2.5 rounded-xl">
          <span>{currency}</span>
          <input
            className="outline-none border-b-2 border-black w-[45px]"
            type="number"
            on
          />
        </div>
      </>
    );
  };

  const ConfirmSettings = () => {
    return (
      <>
        <p>Is this correct?</p>
        <p>
          I want to budget {currency}
          <span className="text-green-400 hover:text-green-700 cursor-pointer underline">
            {budgetAmount}
          </span>{" "}
          <span className="text-green-400 hover:text-green-700 cursor-pointer underline">
            {budgetSchedule}
          </span>
          .
        </p>
        <Button text="Start Budgeting" onClick={() => saveBudgetInfo()} />
      </>
    );
  };

  async function saveBudgetInfo() {
    // console.log(email);
    try {
      await fetch("/api/post-budget-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          currency,
          budgetSchedule,
          budgetAmount,
        }),
      });
    } catch (error) {}
  }

  return (
    <div className="text-center">
      {!currency && <AskCurrency />}
      {currency && !budgetSchedule && <AskBudgetSchedule />}
      {currency && budgetSchedule && !budgetAmount && <AskBudgetAmount />}
      {currency && budgetSchedule && budgetAmount && <ConfirmSettings />}
    </div>
  );
}
