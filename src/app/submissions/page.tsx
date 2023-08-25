"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Image from "next/image";
import { AiFillGithub, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiSolidVideos } from "react-icons/bi";

export default function Participants() {
  const submissions = useQuery(api.participants.getSubmissions);
  const vote = useMutation(api.participants.vote);
  const user = useQuery(api.participants.getRegistrationInfo);

  return (
    <div className="min-h-screen container mx-auto p-6 flex flex-col text-white">
      <h1 className="text-5xl font-bold mb-8 mt-8">
        Submissions {submissions && <>({submissions?.length})</>}
      </h1>

      <p className="mb-8">All submissions are listed below</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {submissions?.map((submission) => (
          <div
            key={submission._id}
            className="flex flex-col gap-4 bg-gray-50 drop-shadow-xl rounded-xl p-12 text-black"
          >
            <div className="flex gap-2 items-center">
              {submission.image && (
                <Image
                  alt={`image of ${submission.name}`}
                  src={submission.image}
                  width="50"
                  height="50"
                  className="rounded-full"
                />
              )}
              {submission.name}
            </div>

            <a
              className="text-blue-500 hover:text-blue-600 flex items-center gap-3 break-all"
              href={submission.videoUrl}
              target="_blank"
            >
              <BiSolidVideos className="text-3xl" /> {submission.videoUrl}
            </a>

            <a
              className="text-blue-500 hover:text-blue-600 flex items-center gap-3 break-all"
              href={submission.githubUrl}
              target="_blank"
            >
              <AiFillGithub className="text-3xl" /> {submission.githubUrl}
            </a>

            {user && user._id !== submission._id && (
              <button
                className="flex gap-2 items-center"
                onClick={() => {
                  vote({
                    participantId: submission._id,
                  });
                }}
              >
                {submission.voteIds.includes(user._id) ? (
                  <>
                    <AiFillHeart className="text-red-500" /> Unvote
                  </>
                ) : (
                  <>
                    <AiOutlineHeart /> Vote
                  </>
                )}
              </button>
            )}
            <div className="">{submission.voteIds.length} Vote(s)</div>
          </div>
        ))}
      </div>
    </div>
  );
}
