'use server'
import { getCurrentUser } from '@/auth/currentUser'
import { db } from '@/utils/prisma'
import { TaskStatus, Priority as PrismaPriority } from '@/generated/prisma'; // Import Prisma's Priority enum
import { TaskFormValues }  from '@/utils/validation' // Import TaskFormValues
import { PRIORITY } from '@/utils/contsants' // Import PRIORITY constants for mapping

export async function getTaskDetails(taskId: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')

  const task = await db.task.findFirst({
    where: {
      id: taskId,
      assignedToId: user.userId // Τα tasks που είναι assigned σε αυτόν τον user
    },
    include: {
      project: {
        include: {
          client: true, // Για να δεις και τον client
          owner: true    // Και τον owner του project
        }
      },
      assignedTo: true // Τον user που είναι assigned το task
    }
  })

  if (!task) {
    throw new Error('Task not found or unauthorized')
  }

  return task
}

export async function getUserTasks() {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')

  const tasks = await db.task.findMany({
    where: {
      assignedToId: user.userId
    },
    include: {
      project: {
        include: {
          client: true
        }
      },
      assignedTo: true // <-- Add this line
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return tasks
}

export async function updateTaskStatus(taskId: string, status: TaskStatus) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')

  // Verify user owns this task
  const task = await db.task.findFirst({
    where: {
      id: taskId,
      assignedToId: user.userId
    }
  })

  if (!task) {
    throw new Error('Task not found or unauthorized')
  }

  return await db.task.update({
    where: { id: taskId },
    data: { status }
  })
}

// Corrected createTask function
export async function createTask(taskData: TaskFormValues) {
  try {
    // Map numeric priority from TaskFormValues to Prisma's Priority enum string
    const prismaPriority: PrismaPriority = (() => {
      switch (taskData.priority) {
        case PRIORITY.LOW:
          return PrismaPriority.LOW;
        case PRIORITY.NORMAL:
          return PrismaPriority.NORMAL;
        case PRIORITY.HIGH:
          return PrismaPriority.HIGH;
        default:
          // Fallback or error handling if priority is unexpected
          // For now, default to NORMAL if an invalid number is passed
          return PrismaPriority.NORMAL;
      }
    })();

    const newTask = await db.task.create({
      data: {
        title: taskData.title,
        description: taskData.description,
        dueDate: taskData.dueDate, // dueDate is already Date | null
        status: taskData.status as TaskStatus, // Cast to Prisma's TaskStatus enum
        priority: prismaPriority, // Use the mapped PrismaPriority enum
       // tags is a string now

        // Connect to Project
        project: {
          connect: { id: taskData.projectId },
        },
        // Connect to Assigned User (single user)
        assignedTo: taskData.assignedToId
          ? { connect: { id: taskData.assignedToId } }
          : undefined, // Only connect if assignedToId is provided
      },
    });
    return { success: true, task: newTask };
  } catch (error) {
    console.error("Error creating task:", error);
    // You might want to return a more specific error message or status
    return { success: false, error: "Failed to create task." };
  }
}
