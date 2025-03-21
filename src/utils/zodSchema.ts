import { z } from "zod";
export const emailIdZodSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email({
    message:
      "Oops! That doesn’t look like a valid email. Try something like john@doe.com.",
  });

export const passwordZodSchema = z
  .string()
  .trim()
  .min(8, {
    message: "Password must be at least 8 characters",
  })
  .regex(/[A-Z]/, {
    message: "Password must include at least one uppercase",
  })
  .regex(/[a-z]/, {
    message: "Password must include at least one lowercase letter",
  })
  .regex(/[0-9]/, {
    message: "Password must include at least one number",
  })
  .regex(/[\W_]/, {
    message: "Password must include at least one special character",
  });
