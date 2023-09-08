import Container from "../_components/common/Container";

export default function Status() {
  return (
    <Container hidePattern={true}>
      <iframe
        className="w-full h-screen"
        src="https://nile.instatus.com/"
      ></iframe>
    </Container>
  );
}
