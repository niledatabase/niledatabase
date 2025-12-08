'use client';

import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

// Helper function to format numbers
const formatNumber = (value: number) => {
  if (value === 0) return '0';
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(value < 10000000 ? 1 : 0)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toFixed(0);
};

export default function AuthPricingCalculator() {
  const [plan, setPlan] = useState('free');
  const [tenants, setTenants] = useState([0]);
  const [activeUsers, setActiveUsers] = useState([0]);
  const [logins, setLogins] = useState([0]);

  // Calculation logic
  const calculateComputeTokens = () => logins[0] * 65;
  const calculateStorageMB = () => (activeUsers[0] * 1) / 1024;
  const calculateStorageGB = () => calculateStorageMB() / 1024;
  const calculateTotalCost = () => {
    if (plan === 'free') return 0;

    let computeCost = 0;
    let storageCost = 0;
    const basePrice = plan === 'pro' ? 15 : 350;

    const totalTokens = calculateComputeTokens();
    const totalStorageMB = calculateStorageMB();

    if (plan === 'pro') {
      // Pro Plan Calculation
      const freeTokens = 150_000_000;
      const freeStorageMB = 5 * 1024;
      const chargeableTokens = Math.max(0, totalTokens - freeTokens);
      const chargeableStorageMB = Math.max(0, totalStorageMB - freeStorageMB);

      computeCost = (chargeableTokens / 1_000_000) * 0.05;
      storageCost = (chargeableStorageMB / 1024) * 1.0;
    } else if (plan === 'scale') {
      // Scale Plan Calculation (Assuming similar structure, adjust if needed)
      // Example: Assume 50GB free storage, 1B free tokens for Scale (update as needed)
      const freeTokens = 1_000_000_000;
      const freeStorageMB = 50 * 1024;
      const chargeableTokens = Math.max(0, totalTokens - freeTokens);
      const chargeableStorageMB = Math.max(0, totalStorageMB - freeStorageMB);

      computeCost = (chargeableTokens / 1_000_000) * 0.04;
      storageCost = (chargeableStorageMB / 1024) * 0.75;
    }

    return computeCost + storageCost + basePrice;
  };

  const storageCostPerGB = plan === 'free' ? 0 : plan === 'pro' ? 1.0 : 0.75;
  const computeCostPerMillionTokens =
    plan === 'free' ? 0 : plan === 'pro' ? 0.05 : 0.04;

  // --- Display Text Logic ---
  const getStorageRateText = () => {
    switch (plan) {
      case 'free':
        return 'free up to 1GB';
      case 'pro':
        return '$1.00/GB after 5GB';
      case 'scale':
        return '$0.75/GB after 50GB';
      default:
        return '';
    }
  };

  const getComputeRateText = () => {
    switch (plan) {
      case 'free':
        return 'free up to 50M tokens';
      case 'pro':
        return '$0.05/M tokens after 150M tokens';
      case 'scale':
        return '$0.04/M tokens after 500M tokens';
      default:
        return '';
    }
  };
  // --- End Display Text Logic ---

  return (
    // Match container style EXACTLY: bg-black, rounded-xl, border, overflow
    <div className="overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#000000]">
      {/* Match header style: bg-black, px-4 py-2, flex */}
      <div className="flex items-center bg-[#000000] px-4 py-2">
        {/* Match dots style: gap-2, w-3 h-3, specific colors */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#FF5F57]"></div>
          <div className="h-3 w-3 rounded-full bg-[#FEBC2E]"></div>
          <div className="h-3 w-3 rounded-full bg-[#28C840]"></div>
        </div>
        {/* Match tabs container style: gap-4 ml-6 */}
        <div className="ml-6 flex gap-4">
          <button
            onClick={() => {
              setPlan('free');
              setTenants([0]);
              setActiveUsers([0]);
              setLogins([0]);
            }}
            // Match tab style: text-sm, px-3 py-1, conditional bg/text
            className={cn(
              'px-3 py-1 text-sm transition-colors',
              plan === 'free'
                ? 'rounded-md bg-[#000000] text-white/90'
                : 'text-white/40 hover:text-white/60',
            )}
          >
            Free
          </button>
          <button
            onClick={() => {
              setPlan('pro');
              setTenants([0]);
              setActiveUsers([0]);
              setLogins([0]);
            }}
            // Match tab style: text-sm, px-3 py-1, conditional bg/text
            className={cn(
              'px-3 py-1 text-sm transition-colors',
              plan === 'pro'
                ? 'rounded-md bg-[#000000] text-white/90'
                : 'text-white/40 hover:text-white/60',
            )}
          >
            Pro: $15/mo
          </button>
          <button
            onClick={() => {
              setPlan('scale');
              setTenants([0]);
              setActiveUsers([0]);
              setLogins([0]);
            }}
            // Match tab style: text-sm, px-3 py-1, conditional bg/text
            className={cn(
              'px-3 py-1 text-sm transition-colors',
              plan === 'scale'
                ? 'rounded-md bg-[#000000] text-white/90'
                : 'text-white/40 hover:text-white/60',
            )}
          >
            Scale: $350/mo
          </button>
        </div>
      </div>

      {/* Match code area: p-6, font-mono, text-sm */}
      <div className="p-6 font-mono text-sm text-[#e4e4e4]">
        {/* Inner wrapper for overflow, mimicking <pre> behavior */}
        <div className="overflow-x-auto">
          {/* Tenant Slider - Prevent wrap */}
          <div className="mb-2 flex items-start whitespace-nowrap">
            <span className="mr-4 w-6 shrink-0 select-none text-right text-[#636669]">
              1
            </span>
            <div className="min-w-0 flex-1">
              {' '}
              {/* Add min-w-0 to allow shrinking */}
              <span className="text-[#E06C75]">// Tenants: </span>
              <span className="text-[#e4e4e4]">{formatNumber(tenants[0])}</span>
              <Slider
                value={tenants}
                onValueChange={setTenants}
                min={0}
                max={1000000}
                step={1000}
                className="my-1.5 w-full touch-pan-y"
              />
            </div>
          </div>

          {/* Active Users Slider - Prevent wrap */}
          <div className="mb-2 flex items-start whitespace-nowrap">
            <span className="mr-4 w-6 shrink-0 select-none text-right text-[#636669]">
              2
            </span>
            <div className="min-w-0 flex-1">
              {' '}
              {/* Add min-w-0 */}
              <span className="text-[#E06C75]">// Active Users: </span>
              <span className="text-[#e4e4e4]">
                {formatNumber(activeUsers[0])}
              </span>
              <span className="ml-2 text-[#98C379]">
                (~{calculateStorageGB().toFixed(2)} GB @ {getStorageRateText()})
              </span>
              <Slider
                value={activeUsers}
                onValueChange={setActiveUsers}
                min={0}
                // Set max dynamically: 1M for Free, 50M for Pro, 100M for Scale
                max={
                  plan === 'free'
                    ? 1000000
                    : plan === 'pro'
                      ? 50000000
                      : 100000000
                }
                // Adjust step based on plan
                step={plan === 'pro' ? 50000 : plan === 'scale' ? 100000 : 1000}
                className="my-1.5 w-full touch-pan-y"
              />
            </div>
          </div>

          {/* Logins Slider - Prevent wrap */}
          <div className="mb-2 flex items-start whitespace-nowrap">
            <span className="mr-4 w-6 shrink-0 select-none text-right text-[#636669]">
              3
            </span>
            <div className="min-w-0 flex-1">
              {' '}
              {/* Add min-w-0 */}
              <span className="text-[#E06C75]">// Logins/mo: </span>
              <span className="text-[#e4e4e4]">{formatNumber(logins[0])}</span>
              <span className="ml-2 text-[#98C379]">
                (~{formatNumber(calculateComputeTokens())} tokens @{' '}
                {getComputeRateText()})
              </span>
              <Slider
                value={logins}
                onValueChange={setLogins}
                min={0}
                // Dynamically set max based on plan
                max={plan === 'free' ? 750000 : 100000000}
                // Dynamically set step based on plan
                step={plan === 'free' ? 1000 : 100000}
                className="my-1.5 w-full touch-pan-y"
              />
            </div>
          </div>

          {/* Cost Calculation Output - Prevent wrap */}
          <div className="mt-4 whitespace-nowrap border-t border-[#2a2a2a] pt-3">
            <div className="flex items-start">
              <span className="mr-4 w-6 shrink-0 select-none text-right text-[#636669]">
                4
              </span>
              <span className="text-[#636669]">/*</span>
            </div>
            <div className="flex items-start pl-[calc(1.5rem+1rem)]">
              {' '}
              {/* Align with code content */}
              <span className="text-[#e4e4e4]">Total Monthly Cost: </span>
              <span className="ml-2 font-semibold text-[#e4e4e4]">
                ${plan === 'free' ? '0.00' : calculateTotalCost().toFixed(2)}
              </span>
            </div>
            <div className="flex items-start pl-[calc(1.5rem+1rem)]">
              {' '}
              {/* Align with code content */}
              {plan !== 'free' && (
                <span className="text-[#e4e4e4]">
                  (Includes ${plan === 'pro' ? '$15' : '$350'} base price for{' '}
                  {plan} plan)
                </span>
              )}
            </div>
            <div className="flex items-start">
              <span className="mr-4 w-6 shrink-0 select-none text-right text-[#636669]">
                5
              </span>
              <span className="text-[#636669]">*/</span>
            </div>
          </div>
        </div>{' '}
        {/* Close inner overflow wrapper */}
      </div>
    </div>
  );
}
