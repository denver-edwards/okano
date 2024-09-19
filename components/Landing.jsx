import Button from "@/components/Button";

export default function Landing() {
  return (
    <main className="py-20 text-center">
      <div>
        <h1 className="py-2 text-4xl">
          Welcome to <span className="font-black">Okano</span>
        </h1>
        <p className="pb-10">
          Know where your money is going by keeping track of your personal
          finance.
        </p>
        <Button text="Sign Up" otherStyles="px-10" onClick={() => {}} />
      </div>
    </main>
  );
}
