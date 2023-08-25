import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  participants: defineTable({
    isAcceptedRules: v.boolean(),
    isUnderstandPrizeEligibility: v.boolean(),
    email: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    payPalMeUrl: v.optional(v.string()),
    name: v.optional(v.string()),
    userId: v.string(),
    image: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    votes: v.number(),
    voteIds: v.array(v.id("participants")),
  }),
});
