import { db } from '@/db';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { eq, sql } from 'drizzle-orm';
import { poll, pollOption, PollWithOptions } from '@/db/schema';

export const selectPolls = async (): Promise<
  Partial<PollWithOptions[] | void>
> => {
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

export const selectUsersPolls = async (
  userId: string,
): Promise<Partial<PollWithOptions[] | void>> => {
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
      .groupBy(poll.id, poll.question);
    return result;
  } catch (error) {
    return error;
  }
};
