import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      name: 'Petfind',
      email: 'pet@find.com',
      password_hash: await hash('123456', 6),
      phone: '191919',
      postal_code: '13270000',
    })

    const { org } = await sut.execute({
      email: 'pet@find.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'pet@fnd.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await expect(() =>
      sut.execute({
        email: 'pet@find.com',
        password: '123455',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
