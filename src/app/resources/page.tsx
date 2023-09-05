"use client";

import { BsDiscord } from "react-icons/bs";

export default function Participants() {
  return (
    <div className="min-h-screen container mx-auto p-6 flex flex-col text-white">
      <h1 className="text-5xl font-bold mb-8 mt-8">Resources</h1>

      <p className="">
        Here is a collection of useful videos, tutorials, links, etc that might
        help you out in this hackathon. I highly recommend joining my discord if
        you want to ask me questions as the hackathon is in progress.
      </p>

      <div className="grid grid-cols-2">
        <a
          target="_blank"
          referrerPolicy="no-referrer"
          href="https://discord.gg/4kGbBaa"
          className="text-blue-300 hover:underline flex items-center gap-2 text-3xl mt-8"
        >
          <BsDiscord /> WebDevCody Discord
        </a>

        <a
          target="_blank"
          referrerPolicy="no-referrer"
          href="https://discord.com/invite/nk6C2qTeCq"
          className="text-green-300 hover:underline flex items-center gap-2 text-3xl mt-8"
        >
          <BsDiscord /> Convex Discord
        </a>
      </div>

      <h2 className="text-4xl mb-4 mt-12">Convex Resources</h2>

      <p className="mb-4">
        If you&apos;re looking for the documentation on how to use convex, check
        our the docs at{" "}
        <a
          href="https://docs.convex.dev/home"
          target="_blank"
          className="mb-8 link"
        >
          https://docs.convex.dev/home
        </a>
      </p>

      <p className="mb-4">
        Convex also provide a lot of templates you can start with if you want to
        speed up the process of having a working project from the{" "}
        <a
          href="https://www.convex.dev/templates"
          target="_blank"
          className="mb-8 link"
        >
          https://www.convex.dev/templates
        </a>
      </p>

      <p>
        Convex created a dedicated page for any hackathon participants to help
        learn convex, be sure to check it out!{" "}
        <a
          href="https://www.convex.dev/hackathon"
          target="_blank"
          className="mb-8 link"
        >
          https://www.convex.dev/hackathon
        </a>
      </p>

      <h2 className="text-4xl mb-4 mt-12">Useful Video Tutorials</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/vaQZYRSiimI?si=3vMoVxpfFcd5cGib"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/cminnoNmZWY?si=kvEfZ_RlRNWrB0BC"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>

        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/5cGdBDXqCJ0?si=SFJjznLZwBUpZrTQ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>

        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/4DEFIEHbC_s?si=vcoB9wI8EK6B8ijQ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  );
}
