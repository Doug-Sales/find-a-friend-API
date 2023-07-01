import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndAutheticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get org profile', async () => {
    const { token } = await createAndAutheticateOrg(app)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.org).toEqual(
      expect.objectContaining({
        email: 'pet@find.com',
      }),
    )
  })
})
