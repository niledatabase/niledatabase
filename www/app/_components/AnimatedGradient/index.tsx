type Props = { children: JSX.Element | JSX.Element[] };
export default function AnimatedGradient(props: Props) {
  const { children } = props;
  return <div className="animated-gradient rounded-lg">{children}</div>;
}
