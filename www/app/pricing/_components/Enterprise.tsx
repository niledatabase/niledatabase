import React from "react";

import Indicator from "./Indicator";
import ContactUs from "./ContactUs";

export default function Enterprise() {
  return (
    <div>
      <div className="flex lg:flex-row gap-5 flex-col">
        <div className="flex gap-5 flex-col">
          <div className="text-[24px] text-orange">Enterprise</div>
          <div className="flex gap-4 flex-col">
            <div className="opacity-70 text-[16px]">
              Built for enterprises who want to scale with confidence, Nile
              Enterprise offers advanced security, powerful admin controls, and
              more
            </div>
            <div className="hidden lg:flex">
              <ContactUs />
            </div>
          </div>
        </div>
        <ul className="flex gap-[22px] flex-col shrink-0 justify-end">
          <div className="flex flex-row gap-2">
            <Indicator value={true} hideDivider />
            Large scale workloads
          </div>
          <div className="flex flex-row gap-2">
            <Indicator value={true} hideDivider />
            Millions of Tenants
          </div>
          <div className="flex flex-row gap-2">
            <Indicator value={true} hideDivider />
            Designated support
          </div>
          <div className="flex flex-row gap-2">
            <Indicator value={true} hideDivider />
            Custom pricing with discounts
          </div>
        </ul>
        <div className="flex lg:hidden">
          <ContactUs />
        </div>
      </div>
    </div>
  );
}
