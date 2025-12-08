import noise from '@/public/Noise-Animation.png';
type Props = { children: JSX.Element | JSX.Element[] };
export default function AnimatedGradient(props: Props) {
  const { children } = props;
  return (
    <div className="animated-gradient relative rounded-[20px]">
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 h-full w-full opacity-60"
        style={{
          background: `url(${noise.src}) lightgray 0% 0% / 50px 50px repeat`,
          mixBlendMode: 'soft-light',
          animation: 'noise 0.1s infinite',
        }}
      />
      {children}
    </div>
  );
}
