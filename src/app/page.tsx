"use client";

import { SignInButton, SignOutButton } from "@clerk/clerk-react";
import { useConvexAuth, useMutation } from "convex/react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const session = useConvexAuth();

  return (
    <div className="max-w-4xl mx-auto flex items-center gap-8">
      <div className="md:w-2/3 flex flex-col gap-4 px-8">
        <h1 className="text-gray-100 md:text-5xl text-3xl font-bold mb-4">
          Welcome to the WebDevCody Hackathon!
        </h1>
        <h1 className="text-gray-100 text-2xl font-bold mb-4 flex gap-1 flex-wrap">
          Sponsored by
          <a
            className="text-blue-200 hover:text-blue-300 flex gap-2"
            href="https://convex.dev"
            target="_blank"
          >
            Convex{" "}
            <Image
              className="rounded-full"
              alt="convex logo"
              src="/convex.jpg"
              width="30"
              height="30"
            />
          </a>
        </h1>
        <p className="text-gray-100 mb-8 text-2xl">
          Be part of my community, learn something new, build something cool,
          and possibly win a cash prize.
        </p>
        {session.isAuthenticated ? (
          <Link href="/register">
            <button className="bg-blue-400 text-white py-2 px-6 rounded-lg hover:bg-blue-500">
              Register Now
            </button>
          </Link>
        ) : (
          <SignInButton mode="modal">
            <button className="btn-primary">Sign In to Register</button>
          </SignInButton>
        )}
      </div>
      <div className="w-1/3 hidden md:block">
        <Image
          src="/code.svg"
          alt="Hackathon Image"
          className="w-full h-auto"
          width="400"
          height="400"
        />
      </div>
    </div>
  );
};

const Convex = () => {
  return (
    <>
      <div className="bg-light-blue relative pt-8 pb-24">
        <div className="wave h-[100px] -top-[99px] w-full absolute z-10"></div>
        <section className="text-center md:w-1/2 px-12 mx-auto flex flex-col gap-8 text-gray-100">
          <h2 className="text-5xl ">$2,500 Prize Pool 💰</h2>
          <p className="text-xl">
            I{"'"}ve wanted to run a hackathon on my channel for a while now,
            but I also wanted to include some type of prizes. Luckily I managed
            to find an amazing sponsor{" "}
            <a
              className="text-red-300 hover:text-red-200 font-bold"
              href="https://convex.dev"
              target="_blank"
            >
              Convex
            </a>{" "}
            who has given me this oppurtunity.
            <br />
            <br />
            I&apos;ve used Convex on a few side projects and a sponsored video,
            and it&apos;s one of few services that is really exciting to me. It
            reminds me of tRPC with the database included. Convex is a
            backend-as-a-service that allows you to quickly build full stack
            type safe applications. No need to setup SQL or a backend API,
            Convex has you covered
          </p>

          <Image
            alt="convex logo"
            src="/convex.png"
            width="800"
            height="600"
            className="rounded-xl"
          />
        </section>
      </div>
    </>
  );
};

function HowItWorks() {
  const steps = [
    "Register and agree to the rules on this site.",
    "Build any web application using Convex.",
    "Submit a short video demonstration of your project",
    "Your submission will be judged and awards given",
  ];
  return (
    <section className="shapes text-center text-white py-24">
      <div className="container mx-auto">
        <h2 className="text-5xl font-semibold text-center mb-8">
          ⚙ How to Partipate
        </h2>

        <p className="text-3xl mb-4">The hackathon is simple:</p>

        <ul className="p-8 text-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center flex-col gap-4 text-black">
          {steps.map((step, idx) => (
            <li
              key={step}
              className="bg-white rounded drop-shadow-xl flex flex-col pb-8 px-4"
            >
              <div className="text-4xl mb-4 pt-8">{idx + 1}.</div>
              <div>{step}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PrizeCategories() {
  const mainCategories = [
    {
      title: "Most Creative use of AI",
      prizes: [500, 300, 150],
      description:
        "The theme is AI, so the more creativity you bring to the playing field, the more money you may win.",
    },
    {
      title: "Most Interactive",
      prizes: [500, 300, 150],
      description:
        "Convex is built around interactivity and live updates.  The more your app supports multiple people editing the same data, the better.",
    },
  ];

  const subCategories = [
    {
      title: "Best Design & UX",
      prizes: [100, 50, 50],
      description:
        "So you're better at design?  We'll give you a chance as well.  Make your app look slick and you'll have a good chance to win.",
    },
    {
      title: "Honorable Mention",
      description:
        "If you fail in all other categories, you may still have a chance.  If I think your application was still cool and worth mentioning, you could place here",
      prizes: [100, 50, 50],
    },
    {
      title: "Top Rated by Public",
      description:
        "What's a hackathon if the public can't vote on the winners?  After submission period, all entrants can vote on their top 3 favorite projects",
      prizes: [100, 50, 50],
    },
  ];

  function idxToString(idx: number) {
    return ["1st", "2nd", "3rd"][idx];
  }

  function CategoryCard({
    category,
  }: {
    category: { prizes: number[]; title: string; description: string };
  }) {
    return (
      <div className="bg-gray-700 p-4 rounded-lg text-white">
        <h2 className="text-lg font-semibold mb-2">{category.title}</h2>
        <p className="text-gray-300">{category.description}</p>
        <div className="text-gray-300 mt-4">
          {category.prizes?.map((amount, idx) => (
            <div key={idx}>
              {idxToString(idx)}: ${amount}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-12 w-full bg-gradient-to-b from-gray-300 to-gray-200 md:py-32 py-16 flex flex-col justify-center items-center">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-5xl  font-semibold text-center mb-12">
          Awarding Categories 🏆
        </h2>

        <p className=" mx-auto text-2xl mb-12">
          This hackathon award structure has different categories. You can only
          win ONE prize, so if you are trying to win big, make sure you focus on
          main categories:
        </p>

        <h3 className="text-3xl font-semibold text-center mb-12">
          Main Categories 🥇
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {mainCategories.map((category, index) => (
            <CategoryCard category={category} key={index} />
          ))}
        </div>

        <h3 className="text-3xl text-black font-semibold text-center mb-12">
          Secondary Categories 🥈
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {subCategories.map((category, index) => (
            <CategoryCard category={category} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StartHacking() {
  const session = useConvexAuth();
  return (
    <div className="px-8 w-full text-white bg-gradient-to-b from-gray-800 to-gray-900 py-32 flex flex-col justify-center items-center">
      <div className="mx-auto max-w-4xl text-center flex text-2xl flex-col gap-4">
        Ready to make something cool? Be sure to{" "}
        <a
          target="_blank"
          referrerPolicy="no-referrer"
          href="https://discord.gg/4kGbBaa"
          className="text-blue-300 hover:underline"
        >
          Join my discord channel
        </a>{" "}
        where you can ask questions and directly communicate with me and other
        hackathon developers.
        <br />
        {session.isAuthenticated ? (
          <Link href="/register">
            <button className="bg-blue-400 text-white py-2 px-6 rounded-lg hover:bg-blue-500">
              Register Now
            </button>
          </Link>
        ) : (
          <SignInButton mode="modal">
            <button className="btn-primary">Sign In to Register</button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="meteor">
        <div className="container mx-auto md:pt-32 pt-16 pb-44">
          <Hero />
        </div>
      </div>

      <Convex />
      <HowItWorks />
      <PrizeCategories />
      <StartHacking />
    </div>
  );
}
