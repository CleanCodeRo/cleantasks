"use server";

import { z } from "zod";
import { db } from "@/prisma/db";
import { title } from "process";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
  errors?: {
    title?: string;
  };
  message?: string | null;
};

const CreateBoard = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
});

export async function create(prevState: State, formData: FormData) {
  const validateFields = CreateBoard.safeParse({
    title: formData.get("title"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing fields.",
    };
  }

  const { title } = validateFields.data;

  try {
    await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      message: "There was an error creating the board.",
    };
  }

  revalidatePath("/organization/org_2dIzjZwmchBRBSJdkKkohWQybxO");
  redirect("/organization/org_2dIzjZwmchBRBSJdkKkohWQybxO");
}
