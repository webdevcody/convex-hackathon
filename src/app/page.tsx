"use client";

import { SignInButton, SignOutButton } from "@clerk/clerk-react";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const session = useConvexAuth();
  const register = useMutation(api.participants.register);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center dark:bg-gray-900 dark:text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        {session.isAuthenticated ? (
          <>
            <SignOutButton />
            Rules: be cool & Use Convex
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await register();
              }}
            >
              <button>Agree</button>
            </form>
          </>
        ) : (
          <SignInButton mode="modal" />
        )}
      </div>
    </main>
  );
}
