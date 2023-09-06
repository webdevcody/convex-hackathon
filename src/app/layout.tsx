"use client";

import "src/styles/globals.css";
import NextTopLoader from "nextjs-toploader";
import { useState, type ReactNode } from "react";
import { ConvexReactClient, useConvexAuth, useQuery } from "convex/react";
import {
  ClerkProvider,
  SignInButton,
  SignOutButton,
  useAuth,
} from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import Link from "next/link";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "../../convex/_generated/api";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const Header = () => {
  const session = useConvexAuth();
  const info = useQuery(api.participants.getRegistrationInfo);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
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
              <span className="text-md md:text-lg">
                WebDevCody
                <br />
                Hackathon
              </span>
            </div>
          </Link>
        </div>

        <div className="text-white gap-4 lg:gap-8 text-xs hidden md:flex">
          <Link href="/register" className="hover:text-gray-200">
            REGISTER
          </Link>
          <Link href="/participants" className="hover:text-gray-200">
            PARTICIPANTS
          </Link>
          <Link href="/resources" className="hover:text-gray-200">
            RESOURCES
          </Link>
          <Link href="/submissions" className="hover:text-gray-200">
            SUBMISSIONS
          </Link>
        </div>

        {session.isAuthenticated && (
          <Link
            href="/submit"
            className="hover:text-gray-200 text-xs hidden md:block"
          >
            <button className="btn-primary">SUBMIT</button>
          </Link>
        )}

        <div className="hidden md:block">
          {session.isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={info?.image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Edit Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <SignOutButton>Sign Out</SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <SignInButton mode="modal">
              <button className="btn bg-gray-100 text-black py-2 px-4 hover:bg-gray-200 rounded">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>

        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <GiHamburgerMenu className="text-white md:hidden text-3xl" />
        </button>
      </header>

      {isMobileMenuOpen && (
        <div
          onClick={() => {
            setIsMobileMenuOpen(false);
          }}
          className="text-white flex flex-col bg-gray-900 justify-center gap-4 pt-4 items-center pb-8"
        >
          <Link href="/register" className="hover:text-gray-200">
            REGISTER
          </Link>
          <Link href="/participants" className="hover:text-gray-200">
            PARTICIPANTS
          </Link>
          <Link href="/resources" className="hover:text-gray-200">
            RESOURCES
          </Link>
          <Link href="/submissions" className="hover:text-gray-200">
            SUBMISSIONS
          </Link>

          {session.isAuthenticated ? (
            <>
              <Link href="/profile" className="hover:text-gray-200">
                PROFILE
              </Link>
              <Link href="/submit" className="hover:text-gray-200 text-xs">
                <button className="btn-primary">SUBMIT</button>
              </Link>
              <SignOutButton>
                <button className="btn bg-gray-100 text-black py-2 px-4 hover:bg-gray-200 rounded">
                  Sign Out
                </button>
              </SignOutButton>
            </>
          ) : (
            <SignInButton mode="modal">
              <button className="btn bg-gray-100 text-black py-2 px-4 hover:bg-gray-200 rounded">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      )}
    </>
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
        <NextTopLoader showSpinner={false} color="#2264AB" />
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
