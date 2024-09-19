// import { signIn } from "@/auth.ts";
//
// export function SignIn() {
//   return (
//     <form
//       action={async () => {
//         "use server";
//         await signIn("");
//       }}
//     >
//       <button type="submit">Sign in</button>
//     </form>
//   );
// }

"use client";
import { signIn } from "next-auth/react";
import Button from "@/components/Button";

export default function SignIn() {
  return <Button text="Sign Up" onClick={() => signIn("google")} />;
}
