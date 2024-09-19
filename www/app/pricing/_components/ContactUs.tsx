"use client";
import Image from "next/image";
import { ContactForm } from "@/app/contact-us/_components/Contact";
import { useCallback, useState } from "react";
import Arrow from "@/public/icons/arrow.svg";
import GradientButton from "@/app/_components/common/GradientButton";

export default function ContactUs() {
  const [show, setShow] = useState(false);

  const showModal = useCallback(() => {
    setShow(!show);
  }, [show]);
  return (
    <div>
      <ContactForm show={show} setShow={setShow} />
      <button
        className="gradientBorderButton before:opacity-100 w-content flex flex-row px-8 before:rounded-xl"
        onClick={showModal}
      >
        <div className="flex flex-row justify-between items-center">
          <span className="text-[white] leading-10">Contact Sales</span>
          <Image src={Arrow} alt="arrow" width={25} height={30} priority />
        </div>
      </button>
    </div>
  );
}
