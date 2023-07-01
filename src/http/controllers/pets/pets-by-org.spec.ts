import request from 'supertest'
import { app } from '@/app'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { createAndAutheticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Get Pets By Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be possible to list pets by org id', async () => {
    const { token } = await createAndAutheticateOrg(app)

    const org = await prisma.org.findFirstOrThrow()

    await prisma.pet.create({
      data: {
        animal: 'dog',
        city: '13270000',
        name: 'Tobby',
        description: 'happy',
        images: '',
        org_id: org.id,
      },
    })

    await prisma.pet.create({
      data: {
        animal: 'cat',
        city: '13270000',
        name: 'shine',
        description: 'lovely',
        images: '',
        org_id: org.id,
      },
    })

    const response = await request(app.server)
      .get(`/pet/mypets`)
      .set('Authorization', `Bearer ${token}`)
      .query({ page: 1 })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
  })
})
