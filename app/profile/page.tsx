"use client";

import useSWR from "swr";
import { useUser } from "@clerk/nextjs";
import { getUserAction } from "@/server/actions/userAction";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const fetcher = (email: string) => getUserAction(email);

export default function Profile() {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  const { data, error, isLoading } = useSWR(
    email ? ["get-user", email] : null,
    () => fetcher(email!),
  );

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(data?.name || "");
  const [bio, setBio] = useState(data?.bio || "");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;
  return (
    <Card className="max-w-lg mx-auto mt-12">
      <CardHeader className="flex items-center space-x-4 pb-0">
        <Image
          src={data?.pic || "https://via.placeholder.com/64"}
          alt="Profile"
          width={64}
          height={64}
          className="rounded-full border border-zinc-700 object-cover"
        />
        <div className="flex-1">
          {isEditing ? (
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-xl font-semibold"
            />
          ) : (
            <CardTitle className="text-xl">{data?.name}</CardTitle>
          )}
          <p className="text-sm text-zinc-500">{data?.email}</p>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <h2 className="text-md font-medium mb-2">Bio</h2>
        {isEditing ? (
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
          />
        ) : (
          <p className="text-zinc-400">{data?.bio || "No bio provided."}</p>
        )}
      </CardContent>

      <div className="flex justify-end space-x-2 p-4 pt-0">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button>Save</Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        )}
      </div>
    </Card>
  );
}
