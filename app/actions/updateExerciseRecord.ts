"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";

interface UpdateExerciseResult {
  error?: string;
}

async function updateExerciseRecord(
  exerciseId: string,
  formData: FormData
): Promise<UpdateExerciseResult> {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found." };
  }

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

  try {
    const exerciseModel = (db as typeof db & {
      exercise?: {
        updateMany: Function;
      };
    }).exercise;

    if (!exerciseModel) {
      return {
        error:
          "Exercise database is not ready yet. Run the Prisma migration and generate step first.",
      };
    }

    await exerciseModel.updateMany({
      where: {
        id: exerciseId,
        userId,
      },
      data: {
        title: titleValue.toString(),
        description: descriptionValue.toString(),
        duration: durationValue.toString(),
        progress: progressValue.toString(),
        imageUrl: imageUrlValue.toString(),
        date: new Date(dateValue.toString()),
      },
    });

    revalidatePath("/exercise");
    revalidatePath("/records");

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

    console.error("Error updating exercise record:", error);
    return { error: "Unable to update the exercise record." };
  }
}

export default updateExerciseRecord;
