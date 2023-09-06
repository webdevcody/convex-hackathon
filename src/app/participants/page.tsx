"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Image from "next/image";

export default function Participants() {
  const participants = useQuery(api.participants.getParticipants);

  return (
    <div className="min-h-screen container mx-auto p-6 flex flex-col text-white">
      <h1 className="text-5xl font-bold mb-8 mt-8">
        Participants {participants && <>({participants?.length})</>}
      </h1>

      <p className="mb-8">
        Everyone who has registered into the hackathon is listed below
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
        {participants?.map((participant) => (
          <div key={participant.name} className="flex gap-4 items-center">
            {participant.image && (
              <Image
                alt={`image of ${participant.name}`}
                src={participant.image}
                width="50"
                height="50"
                className="rounded-full"
              />
            )}
            {participant.name}
          </div>
        ))}
      </div>
    </div>
  );
}
