'use client';
import debounce from 'lodash/debounce';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import Arrow from '@/public/icons/arrow.svg';
type FormValues = {
  email: string;
  message: string;
};
type Props = {
  buttonText?: string;
  header?: JSX.Element;
};
const DefaultHeader = (
  <div className="z-10 mt-5 flex w-full flex-row items-center justify-center text-[40px]">
    Talk to us
  </div>
);

export function ContactForm({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
}) {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [error, setError] = useState<void | string>();
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    // if (show) {
    // document.body.style.overflowY = "hidden";
    // } else {
    // document.body.style.overflowY = "scroll";
    // }
    // return () => {
    // document.body.style.overflowY = "scroll";
    // };
  }, [show]);

  const clear = useCallback(() => {
    setShow(false);
    setSuccess(false);
    reset();
    setError();
  }, []);
  const debounced = useMemo(
    () =>
      debounce(() => {
        clear();
      }, 3200),
    [],
  );

  useEffect(() => {
    if (success) {
      debounced();
    }
    return () => {
      debounced.cancel();
    };
  }, [success]);

  const doSubmit = useCallback(async (body: FormValues) => {
    setError(undefined);
    const resp = await fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(body),
    }).catch((e) => {
      console.log(e);
      setError(e.message);
    });
    if (resp?.status === 200) {
      setSuccess(true);
    } else {
      const result = await new Response(resp?.body).json();
      setError(result.error);
    }
  }, []);
  return (
    <div
      className={`transition-opacity ${
        show ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="fixed bottom-0 left-0 right-0 top-0 z-50 bg-overlay opacity-10"
        onClick={clear}
      />
      <form
        onSubmit={handleSubmit((values) => doSubmit(values))}
        className={`fixed left-1/2 top-1/2 z-[51] -translate-x-1/2 -translate-y-1/2 transition-opacity`}
      >
        <div className="relative flex min-w-[40ch] flex-col gap-5 rounded-[24px] bg-[#000] px-12 py-6 lg:min-w-[60ch]">
          <div className="bg-gradient-text bg-clip-text text-[48px] text-transparent">
            Talk to Us
          </div>
          <div
            className={`transition-opacity ${
              error ? 'opacity-100' : 'opacity-0'
            } pointer-events-none absolute bottom-[96px] left-[48px] right-[48px] rounded-[12px] bg-[#cb052ac2] px-4 py-2`}
          >
            <span className="text-lg opacity-80">{error ? error : null}</span>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[#EFF5FFB1]">
              Email address
            </label>
            <input
              {...register('email')}
              id="email"
              required
              aria-label="email address"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-[12px] border border-[#242627] bg-[#000] px-[16px] py-[8px] outline-none"
            ></input>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-[#EFF5FFB1]">
              How can we help?
            </label>
            <textarea
              {...register('message')}
              required
              aria-label="message"
              id="message"
              rows={5}
              className="max-h-80 w-full rounded-[12px] border border-[#242627] bg-[#000] px-[16px] py-[8px] outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={Boolean(success)}
            className={`flex flex-row gap-2 text-[16px] transition-all ${
              success
                ? 'gradientBorderButton bg-black px-4 py-3'
                : 'gradientButton'
            } my-[24px] !justify-between px-1 leading-[24px] after:rounded-[12px]`}
          >
            <span>
              {success ? (
                <>
                  Thanks for your interest! We will be contacting you shortly.
                </>
              ) : (
                <>Send Message</>
              )}
            </span>
            <Image
              data-image-zoom-disabled
              className="invert"
              src={Arrow}
              alt="arrow"
              width={25}
              height={30}
              priority
            />
          </button>
        </div>
      </form>
    </div>
  );
}
export default function Contact(props: Props) {
  const { header = DefaultHeader } = props;
  const [show, setShow] = useState(false);

  const showModal = useCallback(() => {
    setShow(!show);
  }, [show]);

  return (
    <>
      <div className="itemDivider flex flex-col justify-center px-12 py-8">
        <ContactForm show={show} setShow={setShow} />
        <div className="relative z-10">{header}</div>
        <div>
          <button
            onClick={showModal}
            className="gradientButton my-[24px] flex w-full flex-row !justify-between gap-2 px-1 text-[16px] leading-[24px] after:rounded-[12px]"
          >
            <span>Message</span>
            <Image
              className="invert"
              data-image-zoom-disabled
              src={Arrow}
              alt="arrow"
              width={25}
              height={30}
              priority
            />
          </button>
        </div>
      </div>
    </>
  );
}
