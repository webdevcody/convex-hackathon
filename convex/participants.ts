import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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
        agreedToRules: true,
      });
    } else {
      const participant = await ctx.db.insert("participants", {
        agreedToRules: true,
        userId: identity?.subject,
        email: identity?.email,
        name: identity?.name,
        image: identity.pictureUrl,
      });
      return participant;
    }
  },
});

export const submitProject = mutation({
  args: {
    videoUrl: v.string(),
    githubUrl: v.string(),
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
