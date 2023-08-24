"use client";

import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";

export default function Submit() {
  const submitProject = useMutation(api.participants.submitProject);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen container mx-auto p-6 flex flex-col text-white">
      <h1 className="text-4xl font-bold mb-4 mt-8">Submit Your Project</h1>

      <p>
        Submission will be open up until the end of the submission period. You
        can re-submit this form if you made a mistake.
      </p>

      <form
        className="max-w-xl"
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          const formData = new FormData(e.currentTarget);
          const videoUrl = formData.get("videoUrl") as string;
          const githubUrl = formData.get("githubUrl") as string;

          if (!videoUrl) return;
          if (!githubUrl) return;

          try {
            await submitProject({
              videoUrl,
              githubUrl,
            });
          } catch (err) {
            const error = err as Error;
            if (error.message.includes("agree to the rules")) {
              setError(
                "Submission rejected - please register and agree to the rules before trying to submit"
              );
            } else {
              setError(error.message);
            }
          }
        }}
      >
        <div className="my-4">
          <label htmlFor="videoUrl" className="block text-lg font-medium">
            Video URL:
          </label>
          <input
            type="url"
            id="videoUrl"
            name="videoUrl"
            className="text-black mt-1 p-2 w-full rounded-md border border-gray-300"
            placeholder="Enter your video URL"
            required
          />
        </div>

        <div className="my-4">
          <label htmlFor="githubUrl" className="block text-lg font-medium">
            GitHub URL:
          </label>
          <input
            type="url"
            id="githubUrl"
            name="githubUrl"
            className="text-black mt-1 p-2 w-full rounded-md border border-gray-300"
            placeholder="Enter your GitHub project URL"
            required
          />
        </div>

        {error && <div className="text-red-300 mb-4">{error}</div>}

        <button type="submit" className="btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
