'use server'
import { getCurrentUser } from '@/auth/currentUser'
import { db } from '@/utils/prisma'
import { TaskStatus } from '@/generated/prisma'
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
          owner: true   // Και τον owner του project
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
}``

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