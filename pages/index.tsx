import { useState, useEffect } from "react";
import Landing from "@/components/Landing";
import Budget from "@/components/Budget";
import { useSession } from "next-auth/react";

export default function Home() {
  //get currency+ budgetamount + schedule from db
  const currency = "";

  const { data: session } = useSession();

  return (
    <div className="">
      {!session && <Landing />}
      {session && !currency && <Budget />}
    </div>
  );
}
