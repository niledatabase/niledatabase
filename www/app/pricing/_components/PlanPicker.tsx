'use client';

import { useMemo, useState } from 'react';
import Pro from './Pro';
import Free from './Free';
import Scale from './Scale';
import Enterprise from './Enterprise';

type ValidPlans = 'pro' | 'free' | 'scale' | 'enterprise';
export default function PlanPicker() {
  const [currentPlan, setCurrentPlan] = useState<ValidPlans>('pro');
  const plan = useMemo(() => {
    switch (currentPlan) {
      case 'free':
        return <Free />;
      case 'enterprise':
        return <Enterprise />;
      case 'scale':
        return <Scale />;
      case 'pro':
        return (
          <div className="flex w-full flex-col">
            <div className="flex justify-center">
              <div className="gradientButton !px-3 !py-0 font-semibold leading-[22px] after:rounded-full">
                Recommended
              </div>
            </div>
            <Pro />
          </div>
        );
    }
  }, [currentPlan]);
  return (
    <div className="flex flex-col justify-between gap-8 p-5 lg:hidden">
      <div className="flex justify-center">
        <label
          htmlFor="plan"
          className="w-fit bg-gradient-text bg-clip-text text-2xl text-transparent"
        >
          Change plan
        </label>
      </div>
      <div className="relative">
        <select
          id="plan"
          className="w-full appearance-none rounded-lg border border-slate-700 bg-[#000] px-3 py-1"
          onChange={(e) => {
            setCurrentPlan(e.target.value as ValidPlans);
          }}
        >
          <option value="pro">Pro</option>
          <option value="free">Free</option>
          <option value="scale">Scale</option>
          <option value="enterprise">Enterprise</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 opacity-70">
          <svg
            className="text-gray-400 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {plan}
    </div>
  );
}
