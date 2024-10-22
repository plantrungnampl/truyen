"use server";

import {
  isRedirectError,
  // redirect,
} from "next/dist/client/components/redirect";
import { verify } from "@node-rs/argon2";
import { lucia } from "@/auth";
import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
import { loginSchema, LoginValues } from "@/validation";
import db from "@/lib/db";

export async function Login(
  data: LoginValues
): Promise<{ error?: string; success?: boolean }> {
  try {
    const { username, password } = loginSchema.parse(data);
    const exitingUser = await db.user.findFirst({
      where: {
        username: {
          equals: username.toLowerCase(),
          mode: "insensitive",
        },
      },
    });
    if (!exitingUser || !exitingUser.password) {
      return {
        error: "wrong username or password",
      };
    }
    const validPassword = await verify(exitingUser.password, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    if (!validPassword) {
      return {
        error: "wrong username or password",
      };
    }
    const session = await lucia.createSession(exitingUser.id, {});
    const sessionCookies = lucia.createSessionCookie(session.id);
    const storedCookies = await cookies();
    storedCookies.set(
      sessionCookies.name,
      sessionCookies.value,
      sessionCookies.attributes
    );
    // return redirect("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    if (isRedirectError(error)) throw error;
    return {
      error: "something went wrong",
    };
  }
}
