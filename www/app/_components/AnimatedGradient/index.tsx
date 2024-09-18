import noise from "@/public/Noise-Animation.png";
type Props = { children: JSX.Element | JSX.Element[] };
export default function AnimatedGradient(props: Props) {
  const { children } = props;
  return (
    <div className="animated-gradient rounded-lg relative">
      <div
        className="absolute top-0 left-0 bottom-0 right-0 opacity-60 w-full h-full pointer-events-none"
        style={{
          background: `url(${noise.src}) lightgray 0% 0% / 50px 50px repeat`,
          mixBlendMode: "soft-light",
          animation: "noise 0.1s infinite",
        }}
      />
      {children}
    </div>
  );
}
