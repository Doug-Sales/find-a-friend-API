import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAutheticateOrg(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.org.create({
    data: {
      name: 'Petfind',
      email: 'pet@find.com',
      password_hash: await hash('123456', 6),
      phone: '19191919',
      postal_code: '13270-000',
      role: isAdmin ? 'ADMIN' : 'USER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'pet@find.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
