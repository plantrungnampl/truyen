"use server";

import { lucia } from "@/auth";
import { signUpSchema, signupValues } from "@/validation";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import db from "@/lib/db";
// import { z } from "zod";

export const signup = async (
  credential: signupValues
): Promise<{ error?: string }> => {
  try {
    const result = signUpSchema.safeParse(credential);
    if (!result.success) {
      // Lấy thông báo lỗi đầu tiên trong danh sách lỗi
      const error = result.error.errors[0]?.message;
      return { error };
    }
    // const { username, email, password } = signUpSchema.parse(credential);
    const { username, email, password } = result.data;
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    const userId = generateIdFromEntropySize(10);
    const exittingUsername = await db.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });
    if (exittingUsername) {
      return {
        error: "username aldready exiting",
      };
    }
    const exitingEmail = await db.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });
    if (exitingEmail) {
      return {
        error: "email already exiting",
      };
    }
    await db.user.create({
      data: {
        id: userId,
        username,
        email,
        password: passwordHash,
      },
    });
    const session = await lucia.createSession(userId, {});
    const sessionCookies = lucia.createSessionCookie(session.id);
    // cookies().set(
    //   sessionCookies.name,
    //   sessionCookies.value,
    //   sessionCookies.attributes
    // );
    cookies().set(sessionCookies.name, sessionCookies.value, {
      ...sessionCookies.attributes,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });
    return redirect("/login");
  } catch (error) {
    console.error(error);
    if (isRedirectError(error)) throw error;
    return {
      error: "some thing went wrong",
    };
  }
};
