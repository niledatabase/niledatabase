'use client';
import GradientButton from '@/app/_components/common/GradientButton';
import Subscribe from './Subscribe';
import { useCallback, useState } from 'react';
import { ContactForm } from '@/app/contact-us/_components/Contact';

export default function Footer() {
  const [show, setShow] = useState(false);

  const showModal = useCallback(() => {
    setShow(!show);
  }, [show]);
  return (
    <>
      <ContactForm show={show} setShow={setShow} />
      <div className="flex items-center justify-center flex-col gap-4">
        <div className="bg-gradient-text bg-clip-text text-transparent leading-normal text-[48px] z-10 relative mb-9 text-center">
          Postgres built for modern SaaS
        </div>
        <Subscribe />
        <div className="flex flex-row gap-4 items-center mt-14 lg:mt-0">
          <span className="w-36 h-px bg-divider-bold rounded-sm" />
          <span>or</span>
          <span className="w-36 h-px bg-divider-bold rounded-sm" />
        </div>
        <div>
          <GradientButton onClick={showModal}>
            <span className="bg-gradient-white bg-clip-text text-transparent subpixel-antialiased text-[16px]">
              Contact Us
            </span>
          </GradientButton>
        </div>
      </div>
    </>
  );
}
