import Image from "next/image";
import { useState } from "react";
import { Collider } from "./Collider";
type Props = {
  imageUrl: string;
  altText: string;
  header: string;
  text: string;
  isVisible: boolean;
};

const Text = (props: Props) => {
  const { imageUrl, altText, header, text, isVisible } = props;
  return (
    <div
      className={`flex align-middle gap-5 transition-all ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="rounded-[20px] icon p-3">
        <Image src={imageUrl} alt={altText} width={32} height={32} priority />
      </div>
      <div>
        <h2 className="text-2xl bg-gradient-text bg-clip-text text-transparent leading-normal">
          {header}
        </h2>
        <div className="opacity-60 text-xl">{text}</div>
      </div>
    </div>
  );
};
function getTranslate(lastActive: number) {
  switch (lastActive) {
    case 1:
      return 80;
    case 2:
      return 60;
    case 3:
      return 20;
    case 4:
      return 0;
    default:
      return 100;
  }
}
export default function Texts({
  active,
  setActive,
}: {
  active: number;
  setActive: (active: number) => void;
}) {
  return (
    <Collider
      rootMargin="0px 0px -30% 0px"
      onVisible={() => {
        if (active < 1) {
          setActive(1);
        }
      }}
      onInvisible={() => setActive(0)}
    >
      <div
        className="transition-all duration-[1000ms] flex gap-6 flex-col"
        style={{
          transform: `translateY(calc(${getTranslate(active)} * 1%))`,
        }}
      >
        <Collider
          onVisible={() => {
            if (active < 2) {
              setActive(2);
            }
          }}
          onInvisible={() => setActive(1)}
          rootMargin="0px 0px -20% 0px"
        >
          <Text
            imageUrl="/icons/protect.svg"
            altText="shield with check"
            header="Native tenant data isolation"
            text="Fully secure with no cross tenant access"
            isVisible={active > 0}
          />
        </Collider>
        <Collider
          onVisible={() => {
            if (active < 3) {
              setActive(3);
            }
          }}
          onInvisible={() => setActive(2)}
          rootMargin="0px 0px -30% 0px"
        >
          <Text
            imageUrl="/icons/fire.svg"
            altText="fire"
            header="Hot tenants have no impact on other tenants"
            text="Full performance isolation across your customers"
            isVisible={active > 1}
          />
        </Collider>

        <Collider
          onVisible={() => {
            if (active < 4) {
              setActive(4);
            }
          }}
          onInvisible={() => setActive(3)}
          rootMargin="0px 0px -40% 0px"
        >
          <Text
            imageUrl="/icons/replay.svg"
            altText="green reload icon"
            header="Tenant level backups and instant restoration"
            text="No downtime for your customers or buggy scripts to restore a specific tenant data from your DB backup."
            isVisible={active > 2}
          />
        </Collider>
        <Text
          imageUrl="/icons/multi-tenant.svg"
          altText="teal icon of a large group of people"
          header="Multitenant or dedicated infrastructure"
          text="Multitenant or dedicated infrastructure for tenants in the same database"
          isVisible={active > 3}
        />
      </div>
    </Collider>
  );
}
