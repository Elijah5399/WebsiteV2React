import Typist from "react-typist-component";
import GraphemeSplitter from "grapheme-splitter";

export default function MyTypography(): JSX.Element {
  function splitter(str: string) {
    return new GraphemeSplitter().splitGraphemes(str);
  }
  return (
    <div className="text-lg text-black dark:text-white font-bold h-14">
      <Typist typingDelay={100} splitter={splitter} loop={true}>
        The <span className="text-red-500">heart</span> ❤️ to want change,
        <Typist.Delay ms={1000} />
        <Typist.Backspace count={23} />
        <span className="text-purple-400">skills</span> 🧠 to make it happen.
        <Typist.Delay ms={1000} />
        <Typist.Backspace count={31} />
      </Typist>
    </div>
  );
}
