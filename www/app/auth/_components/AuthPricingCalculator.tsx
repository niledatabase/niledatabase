"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export default function AuthPricingCalculator() {
  const [tenants, setTenants] = useState([0]);
  const [activeUsers, setActiveUsers] = useState([0]);
  const [logins, setLogins] = useState([0]);

  // Helper functions for formatting numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  // Calculate costs
  const calculateComputeTokens = () => {
    // Rough estimate: 100 tokens per login
    return logins[0] * 100;
  };

  const calculateStorageCost = () => {
    // Rough estimate: 1KB per user
    return activeUsers[0] * 0.001; // Convert to MB
  };

  const calculateTotalCost = () => {
    const computeTokens = calculateComputeTokens();
    const storageMB = calculateStorageCost();
    
    // $0.05 per million tokens
    const computeCost = (computeTokens / 1000000) * 0.05;
    // $1 per GB
    const storageCost = (storageMB / 1024) * 1;
    
    return computeCost + storageCost;
  };

  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left section - Sliders */}
        <div className="lg:w-1/2">
          <Card className="bg-black border-zinc-700">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-8 bg-gradient-text bg-clip-text text-transparent">
                How much will Nile Auth cost you?
              </h2>
              
              {/* Tenants Slider */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-4">
                  <p className="text-sm font-medium text-white">Number of Tenants</p>
                </div>
                <div className="relative">
                  <div className="absolute -top-8 left-0 bg-black/80 text-white text-xs px-2 py-0.5 rounded-md border border-zinc-700/50 backdrop-blur-sm">
                    {formatNumber(tenants[0])}
                  </div>
                  <div className="flex justify-between mb-2">
                    <div className="text-[10px] text-zinc-500">0</div>
                    <div className="text-[10px] text-zinc-500">1M tenants</div>
                  </div>
                  <Slider
                    value={tenants}
                    onValueChange={setTenants}
                    min={0}
                    max={1000000}
                    step={1000}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Active Users Slider */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-4">
                  <p className="text-sm font-medium text-white">Active Users</p>
                </div>
                <div className="relative">
                  <div className="absolute -top-8 left-0 bg-black/80 text-white text-xs px-2 py-0.5 rounded-md border border-zinc-700/50 backdrop-blur-sm">
                    {formatNumber(activeUsers[0])}
                  </div>
                  <div className="flex justify-between mb-2">
                    <div className="text-[10px] text-zinc-500">0</div>
                    <div className="text-[10px] text-zinc-500">5M users</div>
                  </div>
                  <Slider
                    value={activeUsers}
                    onValueChange={setActiveUsers}
                    min={0}
                    max={5000000}
                    step={1000}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Logins Slider */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-4">
                  <p className="text-sm font-medium text-white">Logins per Month</p>
                </div>
                <div className="relative">
                  <div className="absolute -top-8 left-0 bg-black/80 text-white text-xs px-2 py-0.5 rounded-md border border-zinc-700/50 backdrop-blur-sm">
                    {formatNumber(logins[0])}
                  </div>
                  <div className="flex justify-between mb-2">
                    <div className="text-[10px] text-zinc-500">0</div>
                    <div className="text-[10px] text-zinc-500">10M logins</div>
                  </div>
                  <Slider
                    value={logins}
                    onValueChange={setLogins}
                    min={0}
                    max={10000000}
                    step={1000}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right section - Cost breakdown */}
        <div className="lg:w-1/2">
          <Card className="bg-black border-zinc-700">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-8 bg-gradient-text bg-clip-text text-transparent">
                Cost Breakdown
              </h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-400">Compute Tokens</span>
                    <span className="text-white">{formatNumber(calculateComputeTokens())} tokens</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-400">Storage</span>
                    <span className="text-white">{calculateStorageCost().toFixed(2)} MB</span>
                  </div>
                  <div className="h-px bg-zinc-700 my-4" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-white">Total Monthly Cost</span>
                    <span className="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent">
                      ${calculateTotalCost().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 