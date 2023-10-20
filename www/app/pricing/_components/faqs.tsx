import Link from "next/link";

export default [
  {
    header: "How long will Nile be free?",
    content: (
      <>
        Nile will always have a free tier. We will go through a few iterations
        to get the limits and dimensions correct. We will try our best to do
        what is right for developers
      </>
    ),
  },
  {
    header: "Can I use Nile for production?",
    content: (
      <>
        Nile is private beta at this point. We would recommend using Nile for
        side projects but not to production.
      </>
    ),
  },
  {
    header: "Can I use Nile above the limits specified in free tier?",
    content: (
      <>
        We would love to discuss your use case and see how we can support it.{" "}
        <Link href="/contact-us" className="underline text-blue">
          You can contact us here
        </Link>
      </>
    ),
  },
  {
    header: "How can I get my questions answered about free tier?",
    content: (
      <>
        You can visit our Github discussions page or join our Discord channel.{" "}
        <Link className="text-blue underline" href="community">
          You can join the community here
        </Link>
      </>
    ),
  },
];
