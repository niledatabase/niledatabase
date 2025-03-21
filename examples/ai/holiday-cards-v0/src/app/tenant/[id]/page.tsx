"use client";

import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface TeamMember {
  id: number;
  name: string;
  email: string;
  description: string;
  holidayWishes?: string;
  imageUrl?: string;
}

export default function TenantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    description: "",
  });
  const { id } = use(params);
  const [generatingFor, setGeneratingFor] = useState<number | null>(null);

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
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMember),
    });
    if (response.ok) {
      setNewMember({ name: "", email: "", description: "" });
      fetchTeamMembers();
    }
  };

  const generateHolidayWishes = async (memberId: number) => {
    setGeneratingFor(memberId);
    try {
      const response = await fetch(
        `/api/tenants/${id}/members/${memberId}/generate`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        fetchTeamMembers();
      }
    } finally {
      setGeneratingFor(null);
    }
  };

  const copyToClipboard = async (member: TeamMember) => {
    try {
      if (member.imageUrl) {
        const response = await fetch(
          `/api/tenants/${id}/members/${member.id}/image`
        );
        const blob = await response.blob();

        await navigator.clipboard.write([
          new ClipboardItem({
            "text/plain": new Blob([member.holidayWishes || ""], {
              type: "text/plain",
            }),
            "image/png": blob,
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(member.holidayWishes || "");
      }

      toast({
        title: "Copied!",
        description:
          "Holiday wishes copied to clipboard. You can paste it into an email or message.",
        duration: 4000,
      });
    } catch (err) {
      console.error("Failed to copy:", err);
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-100 to-green-100 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-red-600">
            Holiday Cards for the Team
          </CardTitle>
          <CardDescription className="text-xl text-center text-gray-600">
            Enter team member info and generate beautiful greetings powered by
            AI
          </CardDescription>
          <CardDescription className="text-md text-center text-gray-600">
            Member description is optional, but it helps the AI generate a more
            personalized message.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={addTeamMember} className="mb-6 space-y-4">
            <Input
              type="text"
              placeholder="Name"
              value={newMember.name}
              onChange={(e) =>
                setNewMember({ ...newMember, name: e.target.value })
              }
              required
            />
            {/* No email support at this time
            <Input
              type="email"
              placeholder="Email"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              required
            /> */}
            <Textarea
              placeholder="Short description"
              value={newMember.description}
              onChange={(e) =>
                setNewMember({ ...newMember, description: e.target.value })
              }
              required
            />
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Add Team Member
            </Button>
          </form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map((member) => (
              <Card key={member.id} className="p-4 bg-white shadow-md">
                <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
                {member.holidayWishes ? (
                  <Button
                    onClick={() => copyToClipboard(member)}
                    variant="outline"
                    size="sm"
                    className="mb-4 shrink-0"
                  >
                    📋 Copy to clipboard and send
                  </Button>
                ) : (
                  <p />
                )}
                {member.holidayWishes ? (
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm italic">{member.holidayWishes}</p>
                    </div>
                    <img
                      src={`/api/tenants/${id}/members/${member.id}/image`}
                      alt="Holiday Wish"
                      className="w-full rounded-md"
                    />
                  </div>
                ) : (
                  <Button
                    onClick={() => generateHolidayWishes(member.id)}
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={generatingFor === member.id}
                  >
                    {generatingFor === member.id
                      ? "Generating..."
                      : "Generate Holiday Wishes"}
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
