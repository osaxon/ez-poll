import { db } from '@/db';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { eq, sql } from 'drizzle-orm';
import { poll, pollOption } from '@/db/schema';

export const selectPolls = async () => {
  try {
    const result = await db
      .select({
        id: poll.id,
        question: poll.question,
        userId: poll.userId,
        createdAt: poll.createdAt,
        options: sql<
          string[]
        >`COALESCE(jsonb_agg(${pollOption.text}), '[]'::jsonb) AS options`,
      })
      .from(poll)
      .leftJoin(pollOption, eq(poll.id, pollOption.pollId))
      .groupBy(poll.id, poll.question);
    return result;
  } catch (error) {
    return error;
  }
};

export const selectUsersPolls = async (userId: string) => {
  try {
    const result = await db
      .select({
        id: poll.id,
        question: poll.question,
        userId: poll.userId,
        createdAt: poll.createdAt,
        options: sql<
          string[]
        >`COALESCE(jsonb_agg(${pollOption.text}), '[]'::jsonb) AS options`,
      })
      .from(poll)
      .leftJoin(pollOption, eq(poll.id, pollOption.pollId))
      .where(eq(poll.userId, userId))
      .groupBy(poll.id, poll.question, poll.userId, poll.createdAt);
    return result;
  } catch (error) {
    return error;
  }
};

export const selectSinglePoll = async (pollId: string) => {
  console.log(pollId < '<--- the poll id');
  try {
    const result = await db
      .select({
        id: poll.id,
        question: poll.question,
        userId: poll.userId,
        createdAt: poll.createdAt,
        options: sql<
          string[]
        >`COALESCE(jsonb_agg(${pollOption.text}), '[]'::jsonb) AS options`,
      })
      .from(poll)
      .leftJoin(pollOption, eq(poll.id, pollOption.pollId))
      .where(eq(poll.id, +pollId))
      .groupBy(poll.id, poll.question);
    return {
      ...result[0],
      options: result[0].options.map((opt) => ({ text: opt, votes: [] })),
    };
  } catch (error) {
    console.error(error, '<---- db error');
    return error;
  }
};
