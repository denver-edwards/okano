import { useState, useEffect } from "react";
import Landing from "@/components/Landing";
import Budget from "@/components/Budget";
import { useSession } from "next-auth/react";

export default function Home() {
  //get currency+ budgetamount + schedule from db
  const { data: session } = useSession();

  // console.log(session);
  return (
    <div className="">
      {!session && <Landing />}
      {session && !session.user.currency && (
        <Budget email={session.user.email} />
      )}
    </div>
  );
}
