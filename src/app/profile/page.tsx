"use client";

import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect, useState } from "react";
import { SuccessAlert } from "@/components/success-alert";
import { useRouter } from "next/navigation";

export default function Profile() {
  const info = useQuery(api.participants.getRegistrationInfo);
  const updateName = useMutation(api.participants.updateName);
  const [form, setForm] = useState<{ name?: string }>({
    name: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();
  const session = useConvexAuth();

  if (!session.isLoading && !session.isAuthenticated) {
    router.push("/");
  }

  useEffect(() => {
    if (info) {
      setForm({ name: info.name });
    }
  }, [info]);

  return (
    <div className="min-h-screen container mx-auto p-6 flex flex-col text-white">
      {isSuccess && (
        <SuccessAlert onClose={() => setIsSuccess(false)}>
          Successfully updated!
        </SuccessAlert>
      )}

      <h1 className="text-4xl font-bold mb-4 mt-8">Update your Info</h1>

      <form
        className="max-w-xl"
        onSubmit={async (e) => {
          e.preventDefault();
          setIsSuccess(false);
          if (!form) return;
          if (!form.name) return;
          await updateName({
            name: form.name,
          });
          setIsSuccess(true);
        }}
      >
        <div className="my-4">
          <label htmlFor="name" className="block text-lg font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={form?.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.currentTarget.value,
              })
            }
            className="text-black mt-1 p-2 w-full rounded-md border border-gray-300"
            placeholder="Enter your Display Name"
            required
          />
        </div>

        <button type="submit" className="btn-primary w-full mt-2">
          Save
        </button>
      </form>
    </div>
  );
}
