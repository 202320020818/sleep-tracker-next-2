"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

interface ExerciseResult {
  error?: string;
}

async function addExerciseRecord(formData: FormData): Promise<ExerciseResult> {
  const titleValue = formData.get("title");
  const descriptionValue = formData.get("description");
  const durationValue = formData.get("duration");
  const progressValue = formData.get("progress");
  const imageUrlValue = formData.get("imageUrl");
  const dateValue = formData.get("date");

  if (
    !titleValue ||
    !descriptionValue ||
    !durationValue ||
    !progressValue ||
    !imageUrlValue ||
    !dateValue
  ) {
    return { error: "All exercise fields are required." };
  }

  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found." };
  }

  try {
    const exerciseModel = (db as typeof db & {
      exercise?: {
        create: Function;
      };
    }).exercise;

    if (!exerciseModel) {
      return {
        error:
          "Exercise database is not ready yet. Run the Prisma migration and generate step first.",
      };
    }

    await exerciseModel.create({
      data: {
        title: titleValue.toString(),
        description: descriptionValue.toString(),
        duration: durationValue.toString(),
        progress: progressValue.toString(),
        imageUrl: imageUrlValue.toString(),
        date: new Date(dateValue.toString()),
        userId,
      },
    });

    revalidatePath("/exercise");

    return {};
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2021"
    ) {
      return {
        error:
          "The Exercise table does not exist yet. Run `npx prisma db push` first.",
      };
    }

    console.error("Error adding exercise record:", error);
    return { error: "Unable to save the exercise record." };
  }
}

export default addExerciseRecord;
