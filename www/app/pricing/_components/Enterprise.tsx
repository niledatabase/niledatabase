import React from 'react';

import Indicator from './Indicator';
import ContactUs from './ContactUs';

export default function Enterprise() {
  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-5">
          <div className="text-[24px] text-orange">Enterprise</div>
          <div className="flex flex-col gap-4">
            <div className="text-[16px] opacity-70">
              Built for enterprises who want to scale with confidence, Nile
              Enterprise offers advanced security, powerful admin controls, and
              more
            </div>
            <div className="hidden lg:flex">
              <ContactUs />
            </div>
          </div>
        </div>
        <ul className="flex shrink-0 flex-col justify-end gap-[22px]">
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
