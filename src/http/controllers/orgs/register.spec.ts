import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Register Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register org', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Petfind',
      email: 'pet@find.com',
      password: '123456',
      phone: '19191919',
      postalCode: '13270-000',
    })

    expect(response.statusCode).toEqual(201)
  })
})
