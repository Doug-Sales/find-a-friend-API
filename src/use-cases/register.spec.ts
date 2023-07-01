import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterUseCase } from './register'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { DataMissingError } from './errors/some-data-missing-error'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute({
      name: 'Petfind',
      email: 'pet@find.com',
      password: '123456',
      phone: '19191919',
      postalCode: '13270000',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Petfind',
      email: 'pet@find.com',
      password: '123456',
      phone: '19191919',
      postalCode: '13270000',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'pet@find.com'

    await sut.execute({
      name: 'Petfind',
      email,
      password: '123456',
      phone: '19191919',
      postalCode: '13270000',
    })

    await expect(() =>
      sut.execute({
        name: 'Petfind',
        email,
        password: '123456',
        phone: '19191919',
        postalCode: '13270000',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should not be able to register missing phone number and postal code', async () => {
    await expect(() =>
      sut.execute({
        name: 'Petfind',
        email: 'pet@find.com',
        password: '123456',
        phone: '',
        postalCode: '',
      }),
    ).rejects.toBeInstanceOf(DataMissingError)
  })
})
