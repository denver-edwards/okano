import { useState, useEffect } from "react";
import Landing from "@/components/Landing";
import Budget from "@/components/Budget";

export default function Home() {
  //get currency+ budgetamount + schedule from db
  const currency = "";

  const session = null;

  return (
    <div className="">
      {!session && <Landing />}
      {session && currency && <Budget />}
    </div>
  );
}
