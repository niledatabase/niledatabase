"use client";
import debounce from "lodash/debounce";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Arrow from "@/public/icons/arrow.svg";
type FormValues = {
  email: string;
  message: string;
};
type Props = {
  buttonText?: string;
  header?: JSX.Element;
};
const DefaultHeader = (
  <div className="flex flex-row mt-5 items-center w-full justify-center text-[40px] z-10">
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
    []
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
    const resp = await fetch("/api/feedback", {
      method: "POST",
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
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="fixed top-0 bottom-0 left-0 right-0 opacity-10 bg-overlay z-50"
        onClick={clear}
      />
      <form
        onSubmit={handleSubmit((values) => doSubmit(values))}
        className={`transition-opacity fixed top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 z-[51]`}
      >
        <div className="bg-[#000] px-12 py-6 rounded-[24px] gap-5 flex flex-col min-w-[40ch] lg:min-w-[60ch] relative">
          <div className="bg-gradient-text bg-clip-text text-transparent text-[48px]">
            Talk to Us
          </div>
          <div
            className={`transition-opacity ${
              error ? "opacity-100" : "opacity-0"
            } pointer-events-none py-2 px-4 bg-[#cb052ac2] rounded-[12px] absolute bottom-[96px] right-[48px] left-[48px]`}
          >
            <span className="opacity-80 text-lg">{error ? error : null}</span>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[#EFF5FFB1]">
              Email address
            </label>
            <input
              {...register("email")}
              id="email"
              required
              aria-label="email address"
              type="email"
              placeholder="Enter your email"
              className="rounded-[12px] border border-[#242627] bg-[#000] px-[16px] py-[8px] w-full outline-none"
            ></input>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-[#EFF5FFB1]">
              How can we help?
            </label>
            <textarea
              {...register("message")}
              required
              aria-label="message"
              id="message"
              rows={5}
              className="rounded-[12px] border border-[#242627] bg-[#000] px-[16px] py-[8px] w-full outline-none max-h-80"
            />
          </div>
          <button
            type="submit"
            disabled={Boolean(success)}
            className={`transition-all flex flex-row gap-2 text-[16px] ${
              success
                ? "gradientBorderButton py-3 px-4 bg-black "
                : "gradientButton"
            } my-[24px] leading-[24px] after:rounded-[12px] px-1 !justify-between`}
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
      <div className="itemDivider px-12 py-8 flex justify-center flex-col">
        <ContactForm show={show} setShow={setShow} />
        <div className="relative z-10">{header}</div>
        <div>
          <button
            onClick={showModal}
            className="flex flex-row gap-2 text-[16px] gradientButton my-[24px] leading-[24px] after:rounded-[12px] px-1 w-full !justify-between"
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
