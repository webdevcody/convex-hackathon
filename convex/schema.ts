import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  participants: defineTable({
    agreedToRules: v.boolean(),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    userId: v.string(),
    image: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
  }),
});
