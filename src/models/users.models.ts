import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { user, UserResponse } from '@/db/schema';

const userWithoutPasswordSchema = {
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
};

const userWithPasswordSchema = {
  ...userWithoutPasswordSchema,
  password: user.password,
};

export const selectUsers = async (): Promise<UserResponse | void> => {
  return await db.select(userWithoutPasswordSchema).from(user);
};

export const selectUserByEmail = async (
  email: string,
): Promise<UserResponse | void> => {
  try {
    const result = await db
      .select(userWithoutPasswordSchema)
      .from(user)
      .where(eq(user.email, email));

    return result;
  } catch (error) {
    console.error('Error during getUserByEmail:', error);
  }
};

export const selectUserByEmailForLoin = async (email: string) => {
    try {
        const userRecord = await db
          .select(userWithPasswordSchema)
          .from(user)
          .where(eq(user.email, email));
    } catch (error) {
        
    }
}