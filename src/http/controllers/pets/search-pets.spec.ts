import request from 'supertest'
import { app } from '@/app'
import { it, describe, beforeAll, afterAll, expect } from 'vitest'
import { createAndAutheticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Search Pets By Description (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be possible to list pets by description', async () => {
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
      .get('/pets/search')
      .query({
        page: 1,
        description: 'lovely',
        city: '13270-000',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        animal: 'cat',
      }),
    ])
  })
})
