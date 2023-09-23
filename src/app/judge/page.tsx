"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Image from "next/image";
import { AiFillGithub, AiFillMoneyCollect } from "react-icons/ai";
import { BiSolidVideos } from "react-icons/bi";
import { Dispatch, SetStateAction, useState } from "react";
import { Alert } from "@/components/alert";
import classNames from "classnames";
import { Id } from "../../../convex/_generated/dataModel";
import { twMerge } from "tailwind-merge";
import { getYoutubeThumbnailUrl } from "@/util/youtube";

const CATEGORIES = {
  ai: "ai",
  collab: "collab",
  all: "all",
} as const;
type CategoryValue = (typeof CATEGORIES)[keyof typeof CATEGORIES];

function RankButtons({
  submissionId,
  rank,
}: {
  submissionId: Id<"participants">;
  rank: number | undefined;
}) {
  const updateRank = useMutation(api.participants.updateRank);

  const buttons = Array.from({ length: 10 }, (_, index) => (
    <button
      key={index + 1}
      className={classNames(
        "flex justify-center items-center w-6 h-6 text-xs text-white font-bold rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-150 ease-in-out",
        {
          "bg-gray-500 hover:bg-blue-700": rank !== index + 1,
          "bg-blue-500": rank === index + 1,
        }
      )}
      onClick={() => {
        updateRank({
          submissionId: submissionId,
          rank: index + 1,
        });
      }}
    >
      {index + 1}
    </button>
  ));

  return <div className="flex space-x-2">{buttons}</div>;
}

function CategoryButtons({
  submissionId,
  category,
}: {
  submissionId: Id<"participants">;
  category: string | undefined;
}) {
  const updateCategory = useMutation(api.participants.updateCategory);

  return (
    <div className="flex space-x-2">
      <button
        className={classNames(
          "flex justify-center items-center text-xs text-white px-2 py-1 font-bold rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-150 ease-in-out",
          {
            "bg-gray-500 hover:bg-blue-700": category !== CATEGORIES.ai,
            "bg-blue-500": category === CATEGORIES.ai,
          }
        )}
        onClick={() => {
          updateCategory({
            submissionId: submissionId,
            category: CATEGORIES.ai,
          });
        }}
      >
        AI
      </button>
      <button
        className={classNames(
          "flex justify-center items-center text-xs px-2 py-1 text-white font-bold rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-150 ease-in-out",
          {
            "bg-gray-500 hover:bg-blue-700": category !== CATEGORIES.collab,
            "bg-blue-500": category === CATEGORIES.collab,
          }
        )}
        onClick={() => {
          updateCategory({
            submissionId: submissionId,
            category: CATEGORIES.collab,
          });
        }}
      >
        COLLAB
      </button>
    </div>
  );
}

function CategoryFilters({
  selectedCategory,
  setSelectedCategory,
  className,
}: {
  selectedCategory: CategoryValue;
  setSelectedCategory: Dispatch<SetStateAction<CategoryValue>>;
} & React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={twMerge("flex space-x-2", className)}>
      <button
        className={classNames(
          "flex justify-center items-center text-xs text-white px-2 py-1 font-bold rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-150 ease-in-out",
          {
            "bg-gray-500 hover:bg-blue-700": selectedCategory !== CATEGORIES.ai,
            "bg-blue-500": CATEGORIES.ai,
          }
        )}
        onClick={() => {
          setSelectedCategory(CATEGORIES.ai);
        }}
      >
        AI
      </button>
      <button
        className={classNames(
          "flex justify-center items-center text-xs px-2 py-1 text-white font-bold rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-150 ease-in-out",
          {
            "bg-gray-500 hover:bg-blue-700":
              selectedCategory !== CATEGORIES.collab,
            "bg-blue-500": selectedCategory === CATEGORIES.collab,
          }
        )}
        onClick={() => {
          setSelectedCategory(CATEGORIES.collab);
        }}
      >
        COLLAB
      </button>

      <button
        className={classNames(
          "flex justify-center items-center text-xs px-2 py-1 text-white font-bold rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-150 ease-in-out",
          {
            "bg-gray-500 hover:bg-blue-700":
              selectedCategory !== CATEGORIES.all,
            "bg-blue-500": selectedCategory === CATEGORIES.all,
          }
        )}
        onClick={() => {
          setSelectedCategory(CATEGORIES.all);
        }}
      >
        ALL
      </button>
    </div>
  );
}

export default function Participants() {
  const submissions = useQuery(api.participants.getJudgingList);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryValue>(
    CATEGORIES.ai
  );

  const filteredSubmissions = submissions?.filter((submission) =>
    selectedCategory === CATEGORIES.all
      ? true
      : submission.category === selectedCategory
  );

  const sortedSubmissions =
    selectedCategory === CATEGORIES.all
      ? filteredSubmissions?.sort((a, b) => b.voteIds.length - a.voteIds.length)
      : filteredSubmissions;

  return (
    <div className="min-h-screen container mx-auto p-6 flex flex-col text-white">
      {error && (
        <Alert variant="error" onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <h1 className="text-5xl font-bold mb-8 mt-8">
        Submissions {submissions && <>({submissions?.length})</>}
      </h1>

      <CategoryFilters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        className="mb-4"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 h-full overflow-y-auto">
        {sortedSubmissions?.map((submission) => (
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

            {submission.videoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={`submission for ${submission.name}`}
                src={
                  submission.thumbnailUrl
                    ? submission.thumbnailUrl
                    : getYoutubeThumbnailUrl(submission.videoUrl)
                }
              />
            )}

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

            <a
              className="text-blue-500 hover:text-blue-600 flex items-center gap-3 break-all"
              href={submission.payPalMeUrl}
              target="_blank"
            >
              <AiFillMoneyCollect className="text-3xl" />{" "}
              {submission.payPalMeUrl}
            </a>

            <CategoryButtons
              submissionId={submission._id}
              category={submission.category}
            />

            <RankButtons submissionId={submission._id} rank={submission.rank} />

            <div className="flex justify-between">
              <div>Peer Judge Score: {submission.voteIds.length}</div>
              <div>Votes Remaining: {submission.votes}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
