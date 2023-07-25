import { useState } from "react";

export default function InteractiveName() {
  const [NameClicked, setNameClicked] = useState<boolean>(false);
  function waveHand() {
    setNameClicked(true);
    setTimeout(() => setNameClicked(false), 1500);
  }
  return (
    <div>
      <div className="hover:cursor-pointer inline-block" onClick={waveHand}>
        <span className="text-5xl font-bold text-emerald-600">Elijah Chia</span>
      </div>
      <div
        className={
          NameClicked
            ? "animate-waving-hand h-fit w-fit inline-block pl-1 origin-bottom-right hover:cursor-default"
            : "animate-waving-hand h-fit w-fit hidden pl-1 origin-bottom-right hover:cursor-default"
        }
      >
        <span className="text-5xl ">👋🏻</span>
      </div>
    </div>
  );
}
