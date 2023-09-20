"use client";

import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect, useState } from "react";
import { Alert } from "@/components/alert";
import { parseApiError } from "@/util/parseApiError";
import { useRouter } from "next/navigation";
import { SignInButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

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
  const user = useConvexAuth();

  useEffect(() => {
    if (submission) {
      setForm(submission ?? defaultFormState);
    }
  }, [submission]);

  if (user.isLoading) {
    return (
      <div className="min-h-screen container mx-auto p-6 flex flex-col text-white justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto p-6 flex flex-col text-white">
      {isSuccess && (
        <Alert variant="success" onClose={() => setIsSuccess(false)}>
          Successfully updated your submission!
        </Alert>
      )}

      <h1 className="text-4xl font-bold mb-4 mt-8">Submit Your Project</h1>

      {user.isAuthenticated ? (
        submission ? (
          <div>
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
                  setError(parseApiError(err));
                }
              }}
            >
              <div className="my-4">
                <label
                  htmlFor="contactEmail"
                  className="block text-lg font-medium"
                >
                  Contact Email (Or Team Representative):
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
                <label
                  htmlFor="githubUrl"
                  className="block text-lg font-medium"
                >
                  GitHub URL
                  <br />
                  (send repo invites to webdevcody if repo is private):
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
                <label
                  htmlFor="payPalMeUrl"
                  className="block text-lg font-medium"
                >
                  PayPal.Me (Individual or Team Representative) URL:
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
        ) : (
          <>
            <div className="mb-4">
              Before you can submit your project, you must agree to the rules
            </div>
            <Link href="/register">
              <button className="bg-gray-100 text-black text-md py-2 px-4 hover:bg-gray-200 rounded">
                Register Here
              </button>
            </Link>
          </>
        )
      ) : (
        <div className="flex flex-col gap-8">
          <div>
            Before you can submit, you must first login and register for the
            hackathon before submitting
          </div>
          <SignInButton mode="modal">
            <button className="btn bg-gray-100 text-black py-2 px-4 hover:bg-gray-200 rounded">
              Sign In
            </button>
          </SignInButton>
        </div>
      )}
    </div>
  );
}
