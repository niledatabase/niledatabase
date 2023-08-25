import Video from "../Video";
function getTranslate(lastActive: number) {
  switch (lastActive) {
    case 0:
    case 1:
      return 0;
    default:
      return (lastActive - 1) * 25;
  }
}
export default function Videos({ lastActive }: { lastActive: number }) {
  return (
    <div className="w-[642px] h-[522px] overflow-hidden">
      <div
        className="transition-all duration-[1000ms]"
        style={{
          transform: `translateY(-${getTranslate(lastActive)}%)`,
        }}
      >
        <Video src={"visualization-3.mp4"} poster={"visualization-3.png"} />
        <Video src={"visualization-1.mp4"} poster={"visualization-1.png"} />
        <Video src={"visualization-4.mp4"} poster={"visualization-4.png"} />
        <Video src={"visualization-2.mp4"} poster={"visualization-2.png"} />
      </div>
    </div>
  );
}
