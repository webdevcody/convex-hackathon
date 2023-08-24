"use client";

import "src/styles/globals.css";
import { type ReactNode } from "react";
import { ConvexReactClient, useConvexAuth } from "convex/react";
import {
  ClerkProvider,
  SignInButton,
  SignOutButton,
  useAuth,
} from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import Link from "next/link";
import Image from "next/image";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const Header = () => {
  const session = useConvexAuth();

  return (
    <header className="bg-gray-900 py-4 px-8 flex justify-between items-center">
      <div className="text-white text-lg font-semibold">
        <Link href="/" className="flex gap-2 items-center">
          <Image
            height="50"
            width="50"
            src="/wdc.jpeg"
            className="rounded-full"
            alt="Flowbite Logo"
          />
          <div className="flex flex-col">
            <span className="text-2xl">WebDevCody Hackathon</span>
          </div>
        </Link>
      </div>

      <div className="text-white flex gap-8">
        <Link href="/register" className="hover:text-gray-200">
          RULES
        </Link>
        <Link href="/participants" className="hover:text-gray-200">
          PARTICIPANTS
        </Link>
        <Link href="/resources" className="hover:text-gray-200">
          RESOURCES
        </Link>
        <Link href="/submit" className="hover:text-gray-200">
          SUBMIT
        </Link>
      </div>

      {session.isAuthenticated ? (
        <SignOutButton>
          <button className="bg-gray-100 text-black py-2 px-4 hover:bg-gray-200 rounded">
            Sign Out
          </button>
        </SignOutButton>
      ) : (
        <SignInButton mode="modal">
          <button className="bg-gray-100 text-black py-2 px-4 hover:bg-gray-200 rounded">
            Sign In
          </button>
        </SignInButton>
      )}
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-8 px-4">
      <div className="max-w-4xl mx-auto flex justify-between">
        <p className="text-gray-600">© 2023 Seibert Software Solutions, LLC</p>

        <div className="flex gap-4 text-center">
          <Link href="/terms-of-service">Terms of Service</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-gray-800">
      <body className="radial">
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
        >
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <Header />
            {children}
            <Footer />
          </ConvexProviderWithClerk>
        </ClerkProvider>
      </body>
    </html>
  );
}
