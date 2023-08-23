import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const register = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("you must login to register");
    }

    const participant = await ctx.db.insert("participants", {
      agreedToRules: true,
      userId: identity?.subject,
      email: identity?.email,
      name: identity?.name,
    });
    return participant;
  },
});
