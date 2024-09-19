export default function Button(props) {
  return (
    <button
      className={`transition-all px-4 py-1.5 rounded-xl bg-white hover:bg-gray-300 text-black ${props.otherStyles}`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
