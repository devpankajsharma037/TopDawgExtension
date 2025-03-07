import { z } from "zod";

export const emailSchema = () =>
  z.object({
    email: z.string().email({ message: "Email is required" }),
  });

export const userDetailsSchema = z.object({
  name: z.string().optional(),
  age: z.string().optional(),
  custom: z.string().optional(),
  notes: z.string().optional(),
  location:z.string().optional(),
  job:z.string().optional(),
});

export const authSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password is required"),
});
