import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const INITIAL_VOTES = 3;
const VOTING_ENABLED = false;

export const register = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("you must login to register");
    }

    const user = await ctx.db
      .query("participants")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    if (user) {
      await ctx.db.patch(user._id, {
        isAcceptedRules: true,
        isUnderstandPrizeEligibility: true,
      });
    } else {
      const participant = await ctx.db.insert("participants", {
        isAcceptedRules: true,
        isUnderstandPrizeEligibility: true,
        votes: INITIAL_VOTES,
        userId: identity?.subject,
        email: identity?.email,
        name: identity?.name,
        image: identity.pictureUrl,
        voteIds: [],
      });
      return participant;
    }
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
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("you must login to register");
    }

    const user = await ctx.db
      .query("participants")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    if (!user) {
      throw new Error(
        "you must register and agree to the rules before you can submit"
      );
    }

    const participant = await ctx.db.patch(user._id, {
      ...args,
    });

    return participant;
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
      throw new Error("you must register to update your info");
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
    const participants = await ctx.db.query("participants").collect();

    return participants
      .map((participant) => ({
        name: participant.name,
        image: participant.image,
        videoUrl: participant.videoUrl,
        githubUrl: participant.githubUrl,
        voteIds: participant.voteIds,
        _id: participant._id,
      }))
      .filter((submission) => !!submission.videoUrl);
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
    if (!VOTING_ENABLED) {
      throw new Error("this is disabled until after submission period");
    }

    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("you must login to register");
    }

    const user = await ctx.db
      .query("participants")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    if (!user) {
      throw new Error(
        "you must register and agree to the rules before you can vote"
      );
    }

    const submission = await ctx.db.get(args.participantId);

    if (!submission) {
      throw new Error("invalid submission id");
    }

    if (submission._id === user._id) {
      throw new Error("you can not vote for your own");
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
        throw new Error("out of votes");
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
