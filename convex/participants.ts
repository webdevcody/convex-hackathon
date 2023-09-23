import { orderBy } from "lodash";
import { mutation, query } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import { GenericQueryCtx } from "convex/server";
import { DataModel } from "./_generated/dataModel";
import seedrandom from "seedrandom";

const INITIAL_VOTES = 3;
const VOTING_ENABLED = true;

function seededSortObjects(array: Record<string, any>, seed: string) {
  const rng = seedrandom(seed);
  const objectsWithRandom = array.map((obj: any) => ({
    obj,
    random: rng(),
  }));
  objectsWithRandom.sort((a: any, b: any) => a.random - b.random);
  const sortedArray = objectsWithRandom.map((item: any) => item.obj);
  return sortedArray;
}

async function assertIsAdmin(ctx: GenericQueryCtx<DataModel>) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new ConvexError("not logged in");
  }

  const info = await ctx.db
    .query("participants")
    .filter((q) => q.eq(q.field("userId"), identity.subject))
    .first();

  if (!info) throw new ConvexError("user not found");
  if (info.email !== "webdevcody@gmail.com") {
    throw new ConvexError("user not admin");
  }
}

export const register = mutation({
  args: {},
  handler: async (ctx) => {
    // TODO: uncomment when submission period is over
    throw new ConvexError("submission period is over");

    // const identity = await ctx.auth.getUserIdentity();

    // if (!identity) {
    //   throw new ConvexError("you must login to register");
    // }

    // const user = await ctx.db
    //   .query("participants")
    //   .filter((q) => q.eq(q.field("userId"), identity.subject))
    //   .first();

    // if (user) {
    //   await ctx.db.patch(user._id, {
    //     isAcceptedRules: true,
    //     isUnderstandPrizeEligibility: true,
    //   });
    // } else {
    //   const participant = await ctx.db.insert("participants", {
    //     isAcceptedRules: true,
    //     isUnderstandPrizeEligibility: true,
    //     votes: INITIAL_VOTES,
    //     userId: identity?.subject,
    //     email: identity?.email,
    //     name: identity?.name,
    //     image: identity.pictureUrl,
    //     voteIds: [],
    //   });
    //   return participant;
    // }
  },
});

export const submitProject = mutation({
  args: {
    videoUrl: v.string(),
    githubUrl: v.string(),
    payPalMeUrl: v.string(),
    contactEmail: v.string(),
  },
  handler: async (ctx, args) => {
    // TODO: uncomment after submission period is over
    throw new ConvexError("submission period has ended");

    // const identity = await ctx.auth.getUserIdentity();

    // if (!identity) {
    //   throw new ConvexError("you must login to register");
    // }

    // const user = await ctx.db
    //   .query("participants")
    //   .filter((q) => q.eq(q.field("userId"), identity.subject))
    //   .first();

    // if (!user) {
    //   throw new ConvexError(
    //     "you must register and agree to the rules before you can submit"
    //   );
    // }

    // const participant = await ctx.db.patch(user._id, {
    //   ...args,
    // });

    // return participant;
  },
});

export const updateName = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return null;
    }

    const user = await ctx.db
      .query("participants")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    if (!user) {
      throw new ConvexError("you must register to update your info");
    }

    await ctx.db.patch(user._id, {
      name: args.name,
    });
  },
});

export const getRegistrationInfo = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return null;
    }

    const info = await ctx.db
      .query("participants")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    return info;
  },
});

export const getParticipants = query({
  args: {},
  handler: async (ctx) => {
    const participants = await ctx.db.query("participants").collect();

    return participants.map((participant) => ({
      name: participant.name,
      image: participant.image,
    }));
  },
});

export const getSubmissions = query({
  args: {},
  handler: async (ctx) => {
    const currentHour = new Date().getHours();

    const participants = await ctx.db.query("participants").collect();

    const secureParticipants = participants
      .map((participant) => ({
        name: participant.name,
        image: participant.image,
        videoUrl: participant.videoUrl,
        githubUrl: participant.githubUrl,
        thumbnailUrl: participant.thumbnailUrl,
        voteIds: participant.voteIds,
        _id: participant._id,
      }))
      .filter((submission) => !!submission.videoUrl);

    return seededSortObjects(
      secureParticipants,
      currentHour + ""
    ) as typeof secureParticipants;
  },
});

export const getJudgingList = query({
  args: {},
  handler: async (ctx) => {
    try {
      await assertIsAdmin(ctx);
    } catch (err) {
      return [];
    }

    const participants = await ctx.db.query("participants").collect();

    return orderBy(
      participants
        .map((participant) => ({
          name: participant.name,
          image: participant.image,
          videoUrl: participant.videoUrl,
          githubUrl: participant.githubUrl,
          voteIds: participant.voteIds,
          payPalMeUrl: participant.payPalMeUrl,
          rank: participant.rank,
          votes: participant.votes,
          category: participant.category,
          thumbnailUrl: participant.thumbnailUrl,
          _id: participant._id,
        }))
        .filter((submission) => !!submission.videoUrl),
      ["rank"],
      ["desc"]
    );
  },
});

export const updateRank = mutation({
  args: {
    rank: v.number(),
    submissionId: v.id("participants"),
  },
  handler: async (ctx, args) => {
    try {
      await assertIsAdmin(ctx);
    } catch (error) {
      return null;
    }

    const submission = await ctx.db.get(args.submissionId);
    if (!submission) return null;

    await ctx.db.patch(submission._id, {
      rank: args.rank,
    });
  },
});

export const updateCategory = mutation({
  args: {
    category: v.string(),
    submissionId: v.id("participants"),
  },
  handler: async (ctx, args) => {
    try {
      await assertIsAdmin(ctx);
    } catch (error) {
      return null;
    }

    const submission = await ctx.db.get(args.submissionId);
    if (!submission) return null;

    await ctx.db.patch(submission._id, {
      category: args.category,
    });
  },
});

export const getSubmission = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return null;
    }

    const info = await ctx.db
      .query("participants")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    if (!info) return null;

    return {
      contactEmail: info.contactEmail,
      githubUrl: info.githubUrl,
      payPalMeUrl: info.payPalMeUrl,
      videoUrl: info.videoUrl,
    };
  },
});

export const vote = mutation({
  args: {
    participantId: v.id("participants"),
  },
  handler: async (ctx, args) => {
    // TODO: remove this line to enable voting
    if (!VOTING_ENABLED) {
      throw new ConvexError("Voting is disabled until after submission period");
    }

    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("You must login to vote");
    }

    const user = await ctx.db
      .query("participants")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    if (!user) {
      throw new ConvexError(
        "You must register and agree to the rules before you can vote"
      );
    }

    const submission = await ctx.db.get(args.participantId);

    if (!submission) {
      throw new ConvexError("invalid submission id");
    }

    if (submission._id === user._id) {
      throw new ConvexError("You can not vote for your own");
    }

    if (
      !user.payPalMeUrl ||
      !user.githubUrl ||
      !user.contactEmail ||
      !user.videoUrl
    ) {
      throw new ConvexError(
        "You can not vote unless you participated in the hackathon and submitted a project."
      );
    }

    if (submission.voteIds.includes(user._id)) {
      await ctx.db.patch(user._id, {
        votes: user.votes + 1,
      });

      await ctx.db.patch(args.participantId, {
        voteIds: submission.voteIds.filter((id) => id !== user._id),
      });
    } else {
      if (user.votes <= 0) {
        throw new ConvexError("out of votes");
      }

      await ctx.db.patch(user._id, {
        votes: user.votes - 1,
      });

      await ctx.db.patch(args.participantId, {
        voteIds: [...submission.voteIds, user._id],
      });
    }
  },
});
