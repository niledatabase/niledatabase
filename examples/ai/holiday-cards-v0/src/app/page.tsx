import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GiftIcon, UsersIcon, SparklesIcon } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-red-100 to-green-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-red-600">
            Send your colleagues holiday wishes!
          </CardTitle>
          <CardDescription className="text-xl text-green-700">
            🎄 ⛄ 🎁 🕯️ ❄️
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <GiftIcon className="h-12 w-12 text-red-500" />
              <h3 className="text-lg font-semibold">Personalized Wishes</h3>
              <p className="text-sm text-gray-600">
                AI-generated holiday messages for your team
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <UsersIcon className="h-12 w-12 text-green-500" />
              <h3 className="text-lg font-semibold">Multi-Tenant</h3>
              <p className="text-sm text-gray-600">
                Manage multiple teams and organizations with ease
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <SparklesIcon className="h-12 w-12 text-yellow-500" />
              <h3 className="text-lg font-semibold">Festive Images</h3>
              <p className="text-sm text-gray-600">
                Beautiful AI-generated holiday card images
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <p className="text-sm text-gray-600">
              You can skip registration and just login with{" "}
              <span className="font-bold text-green-600">demo@demo.com</span>{" "}
              and password{" "}
              <span className="font-bold text-green-600">demo</span>
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
