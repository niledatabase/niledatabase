"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from "react"

// Slot machine digit component
const SlotMachineDigit = ({ digit, isAnimating }: { digit: string, isAnimating: boolean }) => {
  const [displayDigit, setDisplayDigit] = useState(digit)
  
  useEffect(() => {
    if (isAnimating && digit !== displayDigit) {
      let frame = 0
      const frames = 10
      const interval = setInterval(() => {
        frame++
        setDisplayDigit(Math.floor(Math.random() * 10).toString())
        if (frame >= frames) {
          clearInterval(interval)
          setDisplayDigit(digit)
        }
      }, 50)
      return () => clearInterval(interval)
    }
  }, [digit, isAnimating])

  return (
    <div className="relative w-4 h-6 bg-zinc-800/50 rounded-sm overflow-hidden mx-[1px] flex items-center justify-center">
      <span className={`text-sm font-mono transition-transform duration-100 text-brightOrange`}>
        {displayDigit}
      </span>
    </div>
  )
}

// Slot machine price component
const SlotMachinePrice = ({ value, prefix = "$", suffix = "" }: { value: number, prefix?: string, suffix?: string }) => {
  const [prevValue, setPrevValue] = useState(value)
  const [isAnimating, setIsAnimating] = useState(false)
  const formattedValue = value.toFixed(2)
  const digits = formattedValue.replace(".", "").split("")
  
  useEffect(() => {
    if (value !== prevValue) {
      setIsAnimating(true)
      const timeout = setTimeout(() => {
        setIsAnimating(false)
        setPrevValue(value)
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [value, prevValue])

  return (
    <div className="inline-flex items-center">
      {prefix && <span className="text-sm text-white mr-1">{prefix}</span>}
      <div className="flex">
        {digits.map((digit, index) => (
          <React.Fragment key={index}>
            {index === digits.length - 2 && (
              <div className="text-sm text-white mx-[1px] self-end mb-1">.</div>
            )}
            <SlotMachineDigit digit={digit} isAnimating={isAnimating} />
          </React.Fragment>
        ))}
      </div>
      {suffix && <span className="text-sm text-zinc-400 ml-1">{suffix}</span>}
    </div>
  )
}

export default function PricingCalculator({ isEnabled = false }: { isEnabled?: boolean }) {
  // Return early if calculator is disabled
  if (!isEnabled) {
    return null
  }

  // Plan selection
  const [plan, setPlan] = useState("pro")

  // Storage state
  const [storageValue, setStorageValue] = useState([0]) // Start at 0GB

  // Storage increment labels
  const storageIncrements = [
    { value: 0.5, label: '0.5GB' },
    { value: 2, label: '2GB' },
    { value: 5, label: '5GB' },
    { value: 50, label: '50GB' },
    { value: 100, label: '100GB' },
    { value: 250, label: '250GB' },
    { value: 500, label: '500GB' },
    { value: 1000, label: '1TB' }
  ]

  // Function to find the closest increment value
  const findClosestIncrement = (value: number) => {
    return storageIncrements.reduce((prev, curr) => {
      return Math.abs(curr.value - value) < Math.abs(prev.value - value) ? curr : prev
    })
  }

  // Function to convert linear slider value to logarithmic scale
  const toLogScale = (value: number) => {
    const minp = 0
    const maxp = 100
    const minv = Math.log(0.1)
    const maxv = Math.log(1000)
    return Math.exp(minv + (maxv - minv) * (value - minp) / (maxp - minp))
  }

  // Function to convert logarithmic value back to linear scale for slider
  const fromLogScale = (value: number) => {
    const minp = 0
    const maxp = 100
    const minv = Math.log(0.1)
    const maxv = Math.log(1000)
    return (maxp - minp) * (Math.log(value) - minv) / (maxv - minv) + minp
  }

  // Function to format storage value
  const formatStorageValue = (value: number) => {
    if (value === 0) return "0GB"
    if (value >= 1000) {
      return `${Math.floor(value / 1000)}TB`
    }
    return `${Math.floor(value)}GB`
  }

  // Compute states
  const [writeQpsValue, setWriteQpsValue] = useState([0]) // Start at 0 writes
  const [readQpsValue, setReadQpsValue] = useState([0]) // Start at 0 reads

  // Define ComputeSize type
  type ComputeSize = {
    vcpu: number
    memory: number
    hourlyRate: number
  }

  // Dedicated compute instances
  const [computeInstances, setComputeInstances] = useState<ComputeSize[]>([]) // Start with no instances

  // Add state for expanded compute options
  const [showComputeOptions, setShowComputeOptions] = useState(false)

  // Compute sizes data
  const computeSizes: ComputeSize[] = [
    { vcpu: 0.25, memory: 1, hourlyRate: 0.0625 },
    { vcpu: 0.5, memory: 2, hourlyRate: 0.125 },
    { vcpu: 1, memory: 4, hourlyRate: 0.25 },
    { vcpu: 2, memory: 8, hourlyRate: 0.5 },
    { vcpu: 3, memory: 12, hourlyRate: 0.75 },
    { vcpu: 4, memory: 16, hourlyRate: 1.0 },
    { vcpu: 5, memory: 20, hourlyRate: 1.25 },
    { vcpu: 6, memory: 24, hourlyRate: 1.5 },
    { vcpu: 7, memory: 28, hourlyRate: 1.75 },
    { vcpu: 8, memory: 32, hourlyRate: 2.0 },
    { vcpu: 9, memory: 36, hourlyRate: 2.25 },
    { vcpu: 10, memory: 40, hourlyRate: 2.5 },
    { vcpu: 11, memory: 44, hourlyRate: 2.75 },
    { vcpu: 12, memory: 48, hourlyRate: 3.0 },
    { vcpu: 13, memory: 52, hourlyRate: 3.25 },
    { vcpu: 14, memory: 56, hourlyRate: 3.5 },
    { vcpu: 15, memory: 60, hourlyRate: 3.75 },
    { vcpu: 16, memory: 64, hourlyRate: 4.0 },
    { vcpu: 17, memory: 68, hourlyRate: 4.25 },
    { vcpu: 18, memory: 72, hourlyRate: 4.5 },
    { vcpu: 19, memory: 76, hourlyRate: 4.75 },
    { vcpu: 20, memory: 80, hourlyRate: 5.0 },
    { vcpu: 22, memory: 88, hourlyRate: 5.5 },
    { vcpu: 24, memory: 96, hourlyRate: 6 },
    { vcpu: 26, memory: 104, hourlyRate: 6.5 },
    { vcpu: 28, memory: 112, hourlyRate: 7.0 },
    { vcpu: 30, memory: 120, hourlyRate: 7.5 },
    { vcpu: 32, memory: 128, hourlyRate: 8.0 },
    { vcpu: 34, memory: 136, hourlyRate: 8.5 },
    { vcpu: 36, memory: 144, hourlyRate: 9.0 },
    { vcpu: 38, memory: 152, hourlyRate: 9.5 },
    { vcpu: 40, memory: 160, hourlyRate: 10 },
    { vcpu: 44, memory: 176, hourlyRate: 11 },
    { vcpu: 48, memory: 192, hourlyRate: 12 },
    { vcpu: 52, memory: 208, hourlyRate: 13 }
  ]

  // Get available compute sizes based on plan
  const getAvailableComputeSizes = () => {
    const maxVcpu = plan === "pro" ? 16 : 52
    return computeSizes.filter(size => size.vcpu <= maxVcpu)
  }

  // Add compute instance
  const addComputeInstance = (size: ComputeSize) => {
    const maxVcpu = plan === "pro" ? 16 : 52
    if (size.vcpu > maxVcpu) {
      alert(`Maximum ${maxVcpu} VCPU allowed for ${plan} plan`)
      return
    }
    setComputeInstances([...computeInstances, size])
    setShowComputeOptions(false)
  }

  // Cost states with initial values
  const [storageCost, setStorageCost] = useState(0)
  const [writesCost, setWritesCost] = useState(0)
  const [readsCost, setReadsCost] = useState(0)
  const [dedicatedComputeCost, setDedicatedComputeCost] = useState(0)
  const [totalCost, setTotalCost] = useState(0)

  // Calculate storage cost
  const calculateStorageCost = (gb: number) => {
    const includedGB = plan === "pro" ? 5 : 50
    const pricePerGB = plan === "pro" ? 1.0 : 0.75
    if (gb <= includedGB) return 0
    return (gb - includedGB) * pricePerGB
  }

  // Calculate compute costs
  const calculateWritesCost = (monthlyWrites: number) => {
    // Calculate CPU ms: 200ms per write
    const totalCpuMs = monthlyWrites * 200
    // First 150M CPU ms included for pro, 500M for scale
    const includedCpuMs = plan === "pro" ? 150000000 : 500000000
    const pricePerMillionCpuMs = plan === "pro" ? 0.05 : 0.04
    if (totalCpuMs <= includedCpuMs) return 0
    return ((totalCpuMs - includedCpuMs) / 1000000) * pricePerMillionCpuMs
  }

  const calculateReadsCost = (monthlyReads: number) => {
    // Calculate CPU ms: 50ms per read
    const totalCpuMs = monthlyReads * 50
    // $0.05 per million CPU ms for pro, $0.04 for scale
    const pricePerMillionCpuMs = plan === "pro" ? 0.05 : 0.04
    return (totalCpuMs / 1000000) * pricePerMillionCpuMs
  }

  // Calculate dedicated compute cost
  const calculateDedicatedComputeCost = (instances: ComputeSize[]) => {
    if (!instances || instances.length === 0) return 0
    return instances.reduce((total, instance) => {
      return total + (instance.hourlyRate * 24 * 31) // Convert hourly rate to monthly
    }, 0)
  }

  // Update costs when values change
  useEffect(() => {
    const newStorageCost = calculateStorageCost(storageValue[0])
    const newWritesCost = calculateWritesCost(writeQpsValue[0])
    const newReadsCost = calculateReadsCost(readQpsValue[0])
    const newDedicatedComputeCost = calculateDedicatedComputeCost(computeInstances)
    
    setStorageCost(newStorageCost)
    setWritesCost(newWritesCost)
    setReadsCost(newReadsCost)
    setDedicatedComputeCost(newDedicatedComputeCost)
    
    // Add base price based on plan
    const basePlanPrice = plan === "pro" ? 15 : 350
    setTotalCost(newStorageCost + newWritesCost + newReadsCost + newDedicatedComputeCost + basePlanPrice)
  }, [storageValue[0], writeQpsValue[0], readQpsValue[0], computeInstances, plan])

  // Handle plan changes and remove instances that exceed VCPU limit
  useEffect(() => {
    const maxVcpu = plan === "pro" ? 16 : 52
    const validInstances = computeInstances.filter(instance => instance.vcpu <= maxVcpu)
    if (validInstances.length !== computeInstances.length) {
      setComputeInstances(validInstances)
    }
  }, [plan])

  // Function to convert linear slider value to logarithmic scale for writes
  const toLogScaleWrites = (value: number) => {
    const minp = 0
    const maxp = 100
    const minv = Math.log(0.1)
    const maxv = Math.log(5000000)
    return Math.exp(minv + (maxv - minv) * (value - minp) / (maxp - minp))
  }

  // Function to convert logarithmic value back to linear scale for writes slider
  const fromLogScaleWrites = (value: number) => {
    const minp = 0
    const maxp = 100
    const minv = Math.log(0.1)
    const maxv = Math.log(5000000)
    return (maxp - minp) * (Math.log(value) - minv) / (maxv - minv) + minp
  }

  // Function to format writes value
  const formatWritesValue = (value: number) => {
    if (value === 0) return "0 writes"
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M writes`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K writes`
    }
    return `${value.toFixed(0)} writes`
  }

  // Function to format CPU ms value
  const formatCpuMs = (value: number) => {
    if (value === 0) return "0"
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toFixed(0)
  }

  // Function to convert linear slider value to logarithmic scale for reads
  const toLogScaleReads = (value: number) => {
    const minp = 0
    const maxp = 100
    const minv = Math.log(0.1)
    const maxv = Math.log(15000000)
    return Math.exp(minv + (maxv - minv) * (value - minp) / (maxp - minp))
  }

  // Function to convert logarithmic value back to linear scale for reads slider
  const fromLogScaleReads = (value: number) => {
    const minp = 0
    const maxp = 100
    const minv = Math.log(0.1)
    const maxv = Math.log(15000000)
    return (maxp - minp) * (Math.log(value) - minv) / (maxv - minv) + minp
  }

  // Function to format reads value
  const formatReadsValue = (value: number) => {
    if (value === 0) return "0 reads"
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M reads`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K reads`
    }
    return `${value.toFixed(0)} reads`
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-black/50 rounded-xl border border-zinc-700/50 backdrop-blur-xl">
      <h2 className="text-xl font-semibold mb-6 bg-gradient-text bg-clip-text text-transparent">Build your DB cluster and estimate cost</h2>

      <div className="space-y-6">
        {/* Plan Selection */}
        <div className="flex items-center justify-center space-x-2 rounded-lg bg-zinc-900/50 p-2">
          <button
            onClick={() => setPlan("pro")}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
              plan === "pro"
                ? "bg-zinc-800 text-white shadow-lg"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span className={plan === "pro" ? "bg-gradient-text bg-clip-text text-transparent" : ""}>
              Pro
            </span>
            <div className="text-xs text-zinc-500">$15/month</div>
          </button>
          <button
            onClick={() => setPlan("scale")}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
              plan === "scale"
                ? "bg-zinc-800 text-white shadow-lg"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span className={plan === "scale" ? "bg-gradient-text bg-clip-text text-transparent" : ""}>
              Scale
            </span>
            <div className="text-xs text-zinc-500">$350/month</div>
          </button>
          <button
            onClick={() => setPlan("enterprise")}
            disabled
            className="group flex-1 rounded-md px-4 py-2 text-sm font-medium text-zinc-400 transition-all hover:text-white disabled:cursor-not-allowed disabled:opacity-50 relative"
          >
            <span>Enterprise</span>
            <div className="text-xs text-zinc-500">Contact us</div>
            <div className="absolute left-0 right-0 top-full mt-1 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
              For enterprise cost estimates, send mail to support@thenile.dev
            </div>
          </button>
        </div>

        {/* Resource Selection */}
        <div className="grid grid-cols-3 gap-4">
          {/* Storage Section */}
          <Card className="bg-zinc-900/50">
            <CardContent className="p-6 flex flex-col h-full">
              <div>
                <div className="flex items-baseline justify-between">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-white">Storage</h3>
                    <div className="flex items-baseline">
                      <span className="text-xs font-medium text-zinc-400">${plan === "pro" ? "1.00" : "0.75"}</span>
                      <span className="text-[10px] text-zinc-500 ml-1">per GB</span>
                    </div>
                    <p className="text-[10px] text-zinc-500">
                      {plan === "pro" ? "First 5GB included in plan" : "First 50GB included in plan"}
                    </p>
                  </div>
                  <div className="text-right">
                    <SlotMachinePrice value={calculateStorageCost(storageValue[0])} />
                    <div className="text-[10px] text-zinc-500">per month</div>
                  </div>
                </div>
              </div>

              <div className="h-[120px] relative flex flex-col justify-center mt-16">
                {/* Current Value Tooltip */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded-md border border-zinc-700/50 backdrop-blur-sm whitespace-nowrap">
                  <span className="text-xs">
                    {formatStorageValue(storageValue[0])}
                  </span>
                </div>

                {/* Start and End Labels */}
                <div className="flex justify-between mb-2">
                  <div className="text-[10px] text-zinc-500">0GB</div>
                  <div className="text-[10px] text-zinc-500">1TB</div>
                </div>

                <Slider
                  value={[fromLogScale(storageValue[0])]}
                  onValueChange={(newValue) => setStorageValue([toLogScale(newValue[0])])}
                  min={0}
                  max={100}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Serverless Compute Section */}
          <Card className="bg-zinc-900/50">
            <CardContent className="p-6 flex flex-col h-full">
              <div>
                <div className="flex items-baseline justify-between">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-white">Serverless Compute</h3>
                    <div className="flex items-baseline">
                      <span className="text-xs font-medium text-zinc-400">${plan === "pro" ? "0.05" : "0.04"}</span>
                      <span className="text-[10px] text-zinc-500 ml-1">per million CPU ms</span>
                    </div>
                    <p className="text-[10px] text-zinc-500">
                      {plan === "pro" ? "First 150M CPU ms included in plan" : "First 500M CPU ms included in plan"}
                    </p>
                  </div>
                  <div className="text-right">
                    <SlotMachinePrice value={writesCost + readsCost} />
                    <div className="text-[10px] text-zinc-500">per month</div>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                {/* Writes Slider */}
                <div className="mt-8 mb-8">
                  <div className="flex items-baseline gap-2 mb-12">
                    <p className="text-xs font-medium text-white">Writes per month</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -top-8 left-0 bg-black/80 text-white text-xs px-2 py-0.5 rounded-md border border-zinc-700/50 backdrop-blur-sm">
                      {formatWritesValue(writeQpsValue[0])} (~{formatCpuMs(Math.floor(writeQpsValue[0]) * 200)} CPU ms)
                    </div>

                    <div className="flex justify-between mb-2">
                      <div className="text-[10px] text-zinc-500">0</div>
                      <div className="text-[10px] text-zinc-500">5M writes</div>
                    </div>

                    <Slider
                      value={[fromLogScaleWrites(writeQpsValue[0])]}
                      onValueChange={(newValue) => setWriteQpsValue([toLogScaleWrites(newValue[0])])}
                      min={0}
                      max={100}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Reads Slider */}
                <div className="mt-8 mb-8">
                  <div className="flex items-baseline gap-2 mb-12">
                    <p className="text-xs font-medium text-white">Reads per month</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -top-8 left-0 bg-black/80 text-white text-xs px-2 py-0.5 rounded-md border border-zinc-700/50 backdrop-blur-sm">
                      {formatReadsValue(readQpsValue[0])} (~{formatCpuMs(Math.floor(readQpsValue[0]) * 50)} CPU ms)
                    </div>

                    <div className="flex justify-between mb-2">
                      <div className="text-[10px] text-zinc-500">0</div>
                      <div className="text-[10px] text-zinc-500">15M reads</div>
                    </div>

                    <Slider
                      value={[fromLogScaleReads(readQpsValue[0])]}
                      onValueChange={(newValue) => setReadQpsValue([toLogScaleReads(newValue[0])])}
                      min={0}
                      max={100}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dedicated Compute Section */}
          <Card className="bg-zinc-900/50">
            <CardContent className="p-6 flex flex-col h-full">
              <div>
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-sm font-medium text-white">Dedicated Compute</h3>
                  </div>
                  <div className="text-right">
                    <SlotMachinePrice value={dedicatedComputeCost} />
                    <div className="text-[10px] text-zinc-500">per month</div>
                  </div>
                </div>
              </div>

              <div className="flex-1 mt-4">
                {/* Compute instances list and add button remain the same */}
                {/* Compute Instances List */}
                <div className="space-y-2 mb-4">
                  {computeInstances.map((instance, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-zinc-800/30 rounded-lg">
                      <div>
                        <div className="text-xs font-medium text-white">{instance.vcpu} VCPU</div>
                        <div className="text-[10px] text-zinc-400">{instance.memory} GB Memory</div>
                        <div className="text-[10px] text-zinc-400">${instance.hourlyRate}/hour</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <SlotMachinePrice value={instance.hourlyRate * 24 * 31} />
                          <div className="text-[10px] text-zinc-500">per month</div>
                        </div>
                        <button
                          onClick={() => {
                            const newInstances = [...computeInstances]
                            newInstances.splice(index, 1)
                            setComputeInstances(newInstances)
                          }}
                          className="p-1 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-all duration-200"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Compute Button */}
                <button 
                  onClick={() => setShowComputeOptions(!showComputeOptions)}
                  className="w-full bg-zinc-800/30 text-white rounded-md flex flex-row px-4 py-2 justify-center hover:bg-zinc-800/50 transition-all duration-200"
                >
                  <div className="flex flex-row items-center justify-center font-medium text-sm">
                    {showComputeOptions ? 'Hide Options' : '+ Add Compute'}
                  </div>
                </button>

                {/* Compute Options */}
                {showComputeOptions && (
                  <div className="mt-3 p-3 bg-zinc-800/30 rounded-lg">
                    <div className="grid grid-cols-3 gap-2 text-xs font-medium text-zinc-400 mb-2">
                      <div>Compute Size</div>
                      <div>Memory</div>
                      <div>$ per hour</div>
                    </div>
                    <div className="space-y-1 max-h-[250px] overflow-y-auto">
                      {getAvailableComputeSizes().map((size, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            addComputeInstance(size)
                            setShowComputeOptions(false)
                          }}
                          className="grid grid-cols-3 gap-2 w-full text-left p-1.5 hover:bg-zinc-800 rounded-md text-white text-sm transition-all duration-200"
                        >
                          <div>{size.vcpu} VCPU</div>
                          <div>{size.memory} GB</div>
                          <div>${size.hourlyRate}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Total Cost */}
      <div className="flex justify-between items-baseline border-t border-zinc-700/50 pt-4">
        <div>
          <p className="font-medium text-white text-lg">Estimated cost</p>
          <p className="text-[10px] text-zinc-500 mt-0.5">
            (includes ${plan === "pro" ? "15" : "350"}/mo base price for {plan} plan)
          </p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold">
            <SlotMachinePrice value={totalCost} prefix="$" />
          </p>
          <p className="text-[10px] text-zinc-500 mt-0.5">per month</p>
        </div>
      </div>
    </div>
  )
} 