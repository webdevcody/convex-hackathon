import { internalAction, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import { Parser } from "@json2csv/plainjs";

export const getSubmissions = internalQuery(async (ctx) => {
  const participants = await ctx.db.query("participants").collect();

  return participants.filter((submission) => !!submission.videoUrl);
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
