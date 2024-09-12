"use client";
import Image from "next/image";
import { ContactForm } from "@/app/contact-us/_components/Contact";
import { useCallback, useState } from "react";
import Arrow from "@/public/icons/arrow.svg";

export default function ContactUs() {
  const [show, setShow] = useState(false);

  const showModal = useCallback(() => {
    setShow(!show);
  }, [show]);
  return (
    <div className="py-[25px]">
      <ContactForm show={show} setShow={setShow} />
      <GradientButton className="w-full" onClick={showModal}>
        <div className="w-full flex flex-row justify-between items-center">
          <span className="text-[white]">Contact Us</span>
          <Image src={Arrow} alt="arrow" width={25} height={30} priority />
        </div>
      </GradientButton>
    </div>
  );
}
