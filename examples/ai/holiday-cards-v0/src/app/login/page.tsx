'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error(result.error);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-100 to-green-100">
      <Card className="w-96 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-red-600">Holiday Wishes App</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="flex justify-center items-center" style={{ marginBottom: '1rem' }}>
          <p className="text-sm text-gray-600"></p>
        </div> 
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
              Log In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-600">Don&apos;t have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
          <br/><br/>Or skip registration and just login with <span className="font-bold text-green-600">demo@demo.com</span> and password <span className="font-bold text-green-600">demo</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

