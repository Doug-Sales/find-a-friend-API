import request from 'supertest'
import { app } from '@/app'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { createAndAutheticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be possible to register pet', async () => {
    const { token } = await createAndAutheticateOrg(app, true)

    const { id } = await prisma.org.findFirstOrThrow()

    const response = await request(app.server)
      .post(`/pet/${id}/register`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        animal: 'dog',
        name: 'flisby',
        city: '13270-000',
        description: 'Happy',
        images: '',
      })

    expect(response.statusCode).toEqual(201)
  })
})
