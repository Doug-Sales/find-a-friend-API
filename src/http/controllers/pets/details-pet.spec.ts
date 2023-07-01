import request from 'supertest'
import { app } from '@/app'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { createAndAutheticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Get Details from pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be possible get details with pet id', async () => {
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

    const petId = await prisma.pet.findFirst({
      where: {
        animal: 'cat',
      },
    })

    const response = await request(app.server)
      .get(`/pet/${petId?.id}/details`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        pet: expect.objectContaining({
          name: 'shine',
        }),
      }),
    )
  })
})
