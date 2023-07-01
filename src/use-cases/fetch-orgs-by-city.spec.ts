import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { FetchOrgsByCityUseCase } from './fetch-orgs-by-city'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let sut: FetchOrgsByCityUseCase

describe('Fetch Org By City Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FetchOrgsByCityUseCase(orgsRepository)
  })

  it('should be able to fetch orgs by postal code', async () => {
    await orgsRepository.create({
      id: 'pet-01',
      name: 'Petfind',
      email: 'pet@find.com',
      password_hash: '123456',
      phone: '19191919',
      postal_code: '13270000',
    })

    await orgsRepository.create({
      id: 'pet-03',
      name: 'Petfind',
      email: 'pet2@find.com',
      password_hash: '123456',
      phone: '19191919',
      postal_code: '13270000',
    })

    const { orgs } = await sut.execute({
      query: '13270',
    })

    expect(orgs).toHaveLength(2)
    expect(orgs).toEqual([
      expect.objectContaining({ id: 'pet-01' }),
      expect.objectContaining({ id: 'pet-03' }),
    ])
  })

  it('should not be able to fetch orgs without postal code', async () => {
    await orgsRepository.create({
      id: 'pet-01',
      name: 'Petfind',
      email: 'pet@find.com',
      password_hash: '123456',
      phone: '19191919',
      postal_code: '13270000',
    })

    await orgsRepository.create({
      id: 'pet-03',
      name: 'Petfind',
      email: 'pet2@find.com',
      password_hash: '123456',
      phone: '19191919',
      postal_code: '13270000',
    })

    await expect(() =>
      sut.execute({
        query: '',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
