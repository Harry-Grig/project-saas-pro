'use server'
import { getCurrentUser } from '@/auth/currentUser'
import { db } from '@/utils/prisma'

export async function getUserClients() {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')

  const clients = await db.client.findMany({
    include: {
      projects: {
        include: {
          owner: true,
          tasks: true
        },
        where: {
          ownerId: user.userId // Only projects owned by current user
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  // Filter out clients that don't have any projects owned by current user
  return clients.filter(client => client.projects.length > 0)
}

export async function getClientDetails(clientId: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')

  const client = await db.client.findFirst({
    where: {
      id: clientId,
      projects: {
        some: {
          ownerId: user.userId // User must own at least one project for this client
        }
      }
    },
    include: {
      projects: {
        include: {
          owner: true,
          tasks: {
            include: {
              assignedTo: true
            }
          }
        },
        where: {
          ownerId: user.userId
        }
      }
    }
  })

  if (!client) {
    throw new Error('Client not found or unauthorized')
  }

  return client
}