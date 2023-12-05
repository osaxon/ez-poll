import {
  serial,
  text,
  timestamp,
  pgTable,
  integer,
  varchar,
} from 'drizzle-orm/pg-core';

export enum Role {
  Admin = 'admin',
  User = 'user',
}

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  email: text('email').notNull().unique(),
  password: text('password'),
  role: text('role')
    .$type<Role.Admin | Role.User>()
    .notNull()
    .default(Role.User),
  createdAt: timestamp('created_at').$default(() => new Date()),
  updatedAt: timestamp('updated_at').$default(() => new Date()),
});

export const poll = pgTable('poll', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 40 }),
  question: text('question'),
  createdAt: timestamp('created_at').$default(() => new Date()),
});

export const pollOption = pgTable('poll_option', {
  id: serial('id').primaryKey(),
  pollId: integer('poll_id').references(() => poll.id, { onDelete: 'cascade' }),
  text: text('text').notNull(),
});

export const vote = pgTable('vote', {
  id: serial('id').primaryKey(),
  option_id: integer('option_id').references(() => pollOption.id, {
    onDelete: 'cascade',
  }),
  name: text('name').notNull(),
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

export type Poll = typeof poll.$inferSelect;
export type NewPoll = typeof poll.$inferInsert;

export type PollOption = typeof pollOption.$inferSelect;
export type NewPollOption = typeof pollOption.$inferInsert;

export type Vote = typeof vote.$inferSelect;
export type NewVote = typeof vote.$inferInsert;

export type UserResponse = Partial<Omit<User, 'password'>>[];
export type PollWithOptions = Poll & {
  options: Array<{ text: string; votes: string[] }>;
};
