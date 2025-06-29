'use server'
import { getCurrentUser } from '@/auth/currentUser'
import { db } from '@/utils/prisma'
import { ProjectStatus } from '@/generated/prisma'

export async function getProjectDetails(projectId: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')

  const project = await db.project.findFirst({
    where: {
      id: projectId,
      OR: [
        { ownerId: user.userId }, // Projects που είναι owner
        { assignedTo: { some: { id: user.userId } } } // Projects που είναι assigned
      ]
    },
    include: {
      client: true,
      owner: true,
      assignedTo: true,
      tasks: {
        include: {
          assignedTo: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  if (!project) {
    throw new Error('Project not found or unauthorized')
  }

  return project
}

export async function getUserProjects() {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')

  const projects = await db.project.findMany({
    where: {
      OR: [
        { ownerId: user.userId }, // Projects που είναι owner
        { assignedTo: { some: { id: user.userId } } } // Projects που είναι assigned
      ]
    },
    include: {
      client: true,
      owner: true,
      assignedTo: true,
      tasks: {
        select: {
          id: true,
          status: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return projects
}

export async function updateProjectStatus(projectId: string, status: ProjectStatus) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')

  // Verify user has access to this project
  const project = await db.project.findFirst({
    where: {
      id: projectId,
      OR: [
        { ownerId: user.userId },
        { assignedTo: { some: { id: user.userId } } }
      ]
    }
  })

  if (!project) {
    throw new Error('Project not found or unauthorized')
  }

  return await db.project.update({
    where: { id: projectId },
    data: { status }
  })
}