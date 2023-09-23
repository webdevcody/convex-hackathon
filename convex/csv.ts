import { internalAction, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import { Parser } from "@json2csv/plainjs";
import { v } from "convex/values";

export const getImageUrl = internalQuery({
  args: {
    storageId: v.string(),
  },
  async handler(ctx, args) {
    const url = ctx.storage.getUrl(args.storageId);
    return url;
  },
});

export const getSubmissions = internalQuery(async (ctx) => {
  const participants = await ctx.db.query("participants").collect();

  return await Promise.all(
    participants
      .filter((submission) => !!submission.videoUrl)
      .map(async (submission) => ({
        ...submission,
        votedBy: (
          await Promise.all(
            submission.voteIds.map(
              async (votedByUserId) => (await ctx.db.get(votedByUserId))?.name
            )
          )
        ).join(","),
      }))
  );
});

export const generateSubmissionsCsv = internalAction(async (ctx) => {
  const submissions = await ctx.runQuery(internal.csv.getSubmissions);
  const parser = new Parser({});
  const csv = parser.parse(submissions);
  const fileId = await ctx.storage.store(
    new Blob([csv], { type: "plain/text" })
  );
  console.log(fileId);
});

export const generatePeerVotesCsv = internalAction(async (ctx) => {
  const submissions = (await ctx.runQuery(internal.csv.getSubmissions)).map(
    (submission) => ({
      name: submission.name,
      rank: submission.voteIds.length,
      votedBy: submission.votedBy,
      email: submission.email,
    })
  );
  const parser = new Parser({});
  const csv = parser.parse(submissions);
  const fileId = await ctx.storage.store(
    new Blob([csv], { type: "plain/text" })
  );
  console.log(fileId);
});
