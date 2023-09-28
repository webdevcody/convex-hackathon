"use client";

import Image from "next/image";
import { AiFillGithub } from "react-icons/ai";
import { BiSolidVideos } from "react-icons/bi";

const winners = [
  {
    place: "1st AI Category",
    name: "Raymond Wolt",
    avatar:
      "https://hackathon.webdevcody.com/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMjIyMzA2MDQ%2Fdj00IiwicyI6IlBtQTBvNUszeDVScXR2SzNXRzJ6cmx3bW15am0zaWlobkl5RUE5ejR0ejgifQ&w=128&q=75",
    video: "https://www.youtube.com/watch?v=tNH12BkdEJE",
    github: "https://github.com/rwolt/yt-semantic-search",
    image: "https://img.youtube.com/vi/tNH12BkdEJE/sddefault.jpg",
  },
  {
    place: "2st AI Category",
    name: "Soorria Saruva",
    avatar:
      "https://hackathon.webdevcody.com/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvODU0MjYzMz92PTQiLCJzIjoiSHJNN2VUMHlWYm50RDJxa3JBSEllMG5mREJndjZJMFNWWjBSWTBSVFU2QSJ9&w=128&q=75",
    video: "https://www.youtube.com/watch?v=Yjcq378AFx0",
    github: "https://github.com/soorria/prompt-racer",
    image: "https://img.youtube.com/vi/Yjcq378AFx0/sddefault.jpg",
  },
  {
    place: "3rd AI Category",
    name: "Mike Cann",
    avatar:
      "https://hackathon.webdevcody.com/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18yVjVwQXNSRWNwTHUySHp6M2ZWTklhTW5zeFouanBlZyJ9&w=128&q=75",
    video: "https://youtu.be/XZ2iCEcW_io",
    github: "https://github.com/mikecann/chatter-craft",
    image: "https://img.youtube.com/vi/XZ2iCEcW_io/sddefault.jpg",
  },

  {
    place: "1st Collab Category",
    name: "Daria",
    avatar:
      "https://hackathon.webdevcody.com/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18yVjFhVWkzSUNqSnA5azZybU9NUjFsRjlkcWEuanBlZyJ9&w=128&q=75",
    video: "https://youtu.be/H9ZaOTYz0Gg",
    github: "https://github.com/loicpennequin?tab=repositories",
    image: "https://img.youtube.com/vi/H9ZaOTYz0Gg/sddefault.jpg",
  },

  {
    place: "2nd Collab Category",
    name: "Anuj Singh",
    avatar:
      "https://hackathon.webdevcody.com/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18yVjFrSElrMkpEdHJ5SjdwM1JBdm40Zk9wSGYuanBlZyJ9&w=128&q=75",
    video: "https://youtu.be/ANQDPHarZjQ",
    github: "https://github.com/AnujSsStw/hackdeez",
    image: "https://img.youtube.com/vi/ANQDPHarZjQ/sddefault.jpg",
  },

  {
    place: "3rd Collab Category",
    name: "DerPenz",
    avatar:
      "https://hackathon.webdevcody.com/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18yVjFrTVFIRFc1bTRJQndhV05QMGswOHJYZ3kucG5nIn0&w=128&q=75",
    video: "https://youtu.be/mV8fUgiRNyU",
    github: "https://github.com/Der-Penz/convex-hackathon",
    image: "https://img.youtube.com/vi/mV8fUgiRNyU/sddefault.jpg",
  },

  {
    place: "1st Peer Review",
    name: "Muhammad Osama",
    avatar:
      "https://hackathon.webdevcody.com/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18yVjFreXZ5S3JyeWpQZ0xqbEp3am92MUFrbUMucG5nIn0&w=128&q=75",
    video: "https://www.youtube.com/watch?v=fYNmYd2u6mI&feature=youtu.be",
    github: "https://github.com/MuhammadOsama169/hackathon",
    image: "https://img.youtube.com/vi/fYNmYd2u6mI/sddefault.jpg",
  },
  {
    place: "2nd Peer Review",
    name: "Felipe Jimenez",
    avatar:
      "https://hackathon.webdevcody.com/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18yVjFaVmFnWnBTWnNPbnp0TjhKMVhNdEdCaDYucG5nIn0&w=128&q=75",
    video: "https://youtu.be/IGJjsjnqb6g",
    github: "https://github.com/FelipeJz/empire-sagas",
    image: "https://img.youtube.com/vi/IGJjsjnqb6g/sddefault.jpg",
  },

  {
    place: "1st Honorable Mention",
    name: "Kevin Kim",
    avatar:
      "https://hackathon.webdevcody.com/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTEyODc2Njg1P3Y9NCIsInMiOiJad1U4d05WcURSMllUSlFaRDhKUjF3MHRsbnNsZU5OWGRGWWJxYk9aMnZFIn0&w=128&q=75",
    video: "https://www.youtube.com/watch?v=gVdb3DNOG8s",
    github: "https://github.com/sycodes95/polyglot-pal",
    image: "https://img.youtube.com/vi/gVdb3DNOG8s/sddefault.jpg",
  },

  {
    place: "2nd Honorable Mention",
    name: "Amos Machora",
    avatar:
      "https://hackathon.webdevcody.com/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18yVjFvVEc5SWhITHVsTDJXU2hHU0dnNXJjUG4uanBlZyJ9&w=128&q=75",
    video: "https://youtu.be/xowpu0plGBM",
    github: "https://github.com/amosmachora/bidsync",
    image:
      "https://marvelous-sturgeon-753.convex.cloud/api/storage/4cefaf39-468d-4d9e-b024-434cc1aeffd3",
  },
];

export default function Participants() {
  return (
    <div className="min-h-screen container mx-auto p-6 flex flex-col text-white">
      <h1 className="text-5xl font-bold mb-8 mt-8">Winners!</h1>

      <div className="flex flex-col md:gap-12 gap-24 mb-40">
        {winners.map((winner) => {
          return (
            <div
              key={winner.name}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center"
            >
              {winner.place}
              <div className="flex flex-col gap-4 justify-center">
                <img className="w-20 h-20 rounded-full" src={winner.avatar} />
                <h3>{winner.name}</h3>
              </div>
              <img
                alt={`image of ${winner.name}`}
                src={winner.image}
                className="rounded w-52 h-40"
              />

              <div className="flex flex-col gap-4">
                <a
                  className="text-blue-500 hover:text-blue-600 flex items-center gap-3 break-all"
                  href={winner.video}
                  target="_blank"
                >
                  <BiSolidVideos className="text-3xl" /> {winner.video}
                </a>

                <a
                  className="text-blue-500 hover:text-blue-600 flex items-center gap-3 break-all"
                  href={winner.github}
                  target="_blank"
                >
                  <AiFillGithub className="text-3xl" /> {winner.github}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
