"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";

interface DeleteExerciseResult {
  error?: string;
}

type ExerciseDeleteManyArgs = {
  where: {
    id: string;
    userId: string;
  };
};

async function deleteExerciseRecord(
  exerciseId: string
): Promise<DeleteExerciseResult> {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not found." };
  }

  try {
    const exerciseModel = (db as typeof db & {
      exercise?: {
        deleteMany: (args: ExerciseDeleteManyArgs) => Promise<unknown>;
      };
    }).exercise;

    if (!exerciseModel) {
      return {
        error:
          "Exercise database is not ready yet. Run the Prisma migration and generate step first.",
      };
    }

    await exerciseModel.deleteMany({
      where: {
        id: exerciseId,
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

    console.error("Error deleting exercise record:", error);
    return { error: "Unable to delete the exercise record." };
  }
}

export default deleteExerciseRecord;
