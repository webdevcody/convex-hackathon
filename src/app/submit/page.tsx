"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect, useState } from "react";
import { SuccessAlert } from "@/components/success-alert";

const defaultFormState = {
  videoUrl: "",
  githubUrl: "",
  payPalMeUrl: "",
  contactEmail: "",
};

type NonNullable<T> = Exclude<T, null | undefined>;

export default function Submit() {
  const submission = useQuery(api.participants.getSubmission);
  const submitProject = useMutation(api.participants.submitProject);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] =
    useState<NonNullable<typeof submission>>(defaultFormState);

  useEffect(() => {
    if (submission) {
      setForm(submission ?? defaultFormState);
    }
  }, [submission]);

  return (
    <div className="min-h-screen container mx-auto p-6 flex flex-col text-white">
      {isSuccess && (
        <SuccessAlert onClose={() => setIsSuccess(false)}>
          Successfully updated your submission!
        </SuccessAlert>
      )}

      <h1 className="text-4xl font-bold mb-4 mt-8">Submit Your Project</h1>

      <p>
        Submission will be open up until the end of the submission period.{" "}
        <br />
        You can re-submit this form if you made a mistake.
      </p>

      <form
        className="max-w-xl"
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          setIsSuccess(false);
          if (!form) return;
          if (!form.videoUrl) return;
          if (!form.githubUrl) return;
          if (!form.payPalMeUrl) return;
          if (!form.contactEmail) return;

          try {
            await submitProject({
              videoUrl: form.videoUrl,
              githubUrl: form.githubUrl,
              payPalMeUrl: form.payPalMeUrl,
              contactEmail: form.contactEmail,
            });
            setIsSuccess(true);
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
          <label htmlFor="contactEmail" className="block text-lg font-medium">
            Contact Email:
          </label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={form?.contactEmail}
            onChange={(e) =>
              setForm({
                ...form,
                contactEmail: e.currentTarget.value,
              })
            }
            className="text-black mt-1 p-2 w-full rounded-md border border-gray-300"
            placeholder="Enter your email we can contact you with"
            required
          />
        </div>

        <div className="my-4">
          <label htmlFor="videoUrl" className="block text-lg font-medium">
            Video URL:
          </label>
          <input
            type="url"
            id="videoUrl"
            name="videoUrl"
            value={form?.videoUrl}
            onChange={(e) =>
              setForm({
                ...form,
                videoUrl: e.currentTarget.value,
              })
            }
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
            value={form?.githubUrl}
            onChange={(e) =>
              setForm({
                ...form,
                githubUrl: e.currentTarget.value,
              })
            }
            className="text-black mt-1 p-2 w-full rounded-md border border-gray-300"
            placeholder="Enter your GitHub project URL"
            required
          />
        </div>

        <div className="my-4">
          <label htmlFor="payPalMeUrl" className="block text-lg font-medium">
            PayPal.Me URL:
          </label>
          <input
            type="url"
            id="payPalMeUrl"
            name="payPalMeUrl"
            value={form?.payPalMeUrl}
            onChange={(e) =>
              setForm({
                ...form,
                payPalMeUrl: e.currentTarget.value,
              })
            }
            className="text-black mt-1 p-2 w-full rounded-md border border-gray-300"
            placeholder="Enter your PayPal.Me Url"
            required
          />
        </div>

        {error && <div className="text-red-300 mb-4">{error}</div>}

        <button type="submit" className="btn-primary w-full mt-2">
          Submit
        </button>
      </form>
    </div>
  );
}
