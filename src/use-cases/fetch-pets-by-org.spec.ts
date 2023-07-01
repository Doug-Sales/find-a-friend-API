import { describe, it, beforeEach, expect } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { FetchPetsByOrgUseCase } from './fetch-pets-by-org'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchPetsByOrgUseCase

describe('Fetch Pets By Org Use Case', () => {
  beforeEach(async () => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsByOrgUseCase(petsRepository, inMemoryOrgsRepository)
  })

  it('should be able to fetch list pets by org id', async () => {
    await inMemoryOrgsRepository.create({
      id: 'pet-01',
      name: 'Petfind',
      email: 'pet@find.com',
      password_hash: '123456',
      phone: '19191919',
      postal_code: '13280000',
    })

    await petsRepository.create({
      org_id: 'pet-01',
      name: 'caramelo',
      city: '13270000',
      animal: 'dog',
      description: 'happy',
      images: '',
    })

    await petsRepository.create({
      org_id: 'pet-01',
      name: 'riven',
      city: '13270000',
      animal: 'cat',
      description: 'loved',
      images: '',
    })

    const { pets } = await sut.execute({
      orgId: 'pet-01',
      page: 1,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ animal: 'dog' }),
      expect.objectContaining({ animal: 'cat' }),
    ])
  })

  it('should not be possible fetch list pets without org id ', async () => {
    await inMemoryOrgsRepository.create({
      id: 'pet-01',
      name: 'Petfind',
      email: 'pet@find.com',
      password_hash: '123456',
      phone: '19191919',
      postal_code: '13270000',
    })

    await petsRepository.create({
      org_id: 'pet-01',
      name: 'caramelo',
      city: '13270000',
      animal: 'toto',
      description: 'happy',
      images: '',
    })

    await expect(() =>
      sut.execute({
        orgId: '',
        page: 1,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
