import { internalMutation } from "./_generated/server";

export const giveVotes = internalMutation({
  async handler(ctx) {
    const participants = await ctx.db.query("participants").collect();
    await Promise.all(
      participants.map((participant) => {
        return ctx.db.patch(participant._id, {
          votes: participant.votes + 3,
        });
      })
    );
  },
});
