'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  description: string;
  holidayWishes?: string;
  imageUrl?: string;
}

export default function TenantPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newMember, setNewMember] = useState({ name: '', email: '', description: '' });
  const { id } = use(params);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    const response = await fetch(`/api/tenants/${id}/members`);
    const data = await response.json();
    setTeamMembers(data);
  };

  const addTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/tenants/${id}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMember),
    });
    if (response.ok) {
      setNewMember({ name: '', email: '', description: '' });
      fetchTeamMembers();
    }
  };

  const generateHolidayWishes = async (memberId: number) => {
    const response = await fetch(`/api/tenants/${id}/members/${memberId}/generate`, {
      method: 'POST',
    });
    if (response.ok) {
      fetchTeamMembers();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-100 to-green-100 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-red-600">Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addTeamMember} className="mb-6 space-y-4">
            <Input
              type="text"
              placeholder="Name"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              required
            />
            <Textarea
              placeholder="Short description"
              value={newMember.description}
              onChange={(e) => setNewMember({ ...newMember, description: e.target.value })}
              required
            />
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">Add Team Member</Button>
          </form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map((member) => (
              <Card key={member.id} className="p-4 bg-white shadow-md">
                <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{member.email}</p>
                <p className="text-sm mb-4">{member.description}</p>
                {member.holidayWishes ? (
                  <div>
                    <p className="text-sm italic mb-2">{member.holidayWishes}</p>
                    {member.imageUrl && <img src={member.imageUrl} alt="Holiday Wish" className="w-full rounded-md" />}
                  </div>
                ) : (
                  <Button onClick={() => generateHolidayWishes(member.id)} className="w-full bg-red-600 hover:bg-red-700">
                    Generate Holiday Wishes
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

