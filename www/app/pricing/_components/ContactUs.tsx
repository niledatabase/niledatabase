"use client";
import Image from "next/image";
import GradientButton from "@/app/_components/common/GradientButton";
import { ContactForm } from "@/app/contact-us/_components/Contact";
import { useCallback, useState } from "react";

export default function ContactUs() {
  const [show, setShow] = useState(false);

  const showModal = useCallback(() => {
    setShow(!show);
  }, [show]);
  return (
    <>
      <ContactForm show={show} setShow={setShow} />
      <GradientButton className="w-full" onClick={showModal}>
        <div className="w-full flex flex-row justify-between items-center">
          <span className="text-[white]">Contact Us</span>
          <Image
            src="/icons/arrow.svg"
            alt="arrow"
            width={25}
            height={30}
            priority
          />
        </div>
      </GradientButton>
    </>
  );
}
