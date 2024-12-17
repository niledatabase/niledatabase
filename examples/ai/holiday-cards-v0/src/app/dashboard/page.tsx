'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Tenant {
  id: number;
  name: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [newTenantName, setNewTenantName] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchTenants();
    }
  }, [status, router]);

  const fetchTenants = async () => {
    const response = await fetch('/api/tenants');
    const data = await response.json();
    console.log('Tenants data:', data);
    setTenants(data);
  };

  const createTenant = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/tenants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newTenantName }),
    });
    if (response.ok) {
      setNewTenantName('');
      fetchTenants();
    }
  };

  const selectTenant = (tenantId: number) => {
    router.push(`/tenant/${tenantId}`);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-100 to-green-100 p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-red-600">Welcome, {session?.user?.name}!</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Your Teams</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {tenants.map((tenant) => (
              <Button
                key={tenant.id}
                onClick={() => selectTenant(tenant.id)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {tenant.name}
              </Button>
            ))}
          </div>
          <form onSubmit={createTenant} className="flex gap-2">
            <Input
              type="text"
              placeholder="New Team Name"
              value={newTenantName}
              onChange={(e) => setNewTenantName(e.target.value)}
              required
            />
            <Button type="submit" className="bg-red-600 hover:bg-red-700">Create Team</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

