import request from 'supertest'
import { app } from '@/app'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { createAndAutheticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Fetch All Pets by City (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be possible to list pets by city', async () => {
    await createAndAutheticateOrg(app)

    const { id } = await prisma.org.findFirstOrThrow()

    await prisma.pet.create({
      data: {
        animal: 'dog',
        city: '13270000',
        name: 'Tobby',
        description: 'happy',
        images: '',
        org_id: id,
      },
    })

    await prisma.pet.create({
      data: {
        animal: 'cat',
        city: '13270000',
        name: 'shine',
        description: 'lovely',
        images: '',
        org_id: id,
      },
    })

    const response = await request(app.server)
      .get('/pets/list')
      .query({
        page: 1,
        query: '13270-000',
      })
      .send()

    const params = await prisma.pet.findFirst({
      where: {
        animal: 'cat',
      },
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
    expect(params).toEqual(
      expect.objectContaining({
        animal: 'cat',
      }),
    )
  })
})
