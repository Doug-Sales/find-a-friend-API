import { describe, it, beforeEach, expect } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { SearchPetsByDescriptionUseCase } from './search-pets-by-description'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPetsByDescriptionUseCase

describe('Search Pets By Description Use Case', () => {
  beforeEach(async () => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsByDescriptionUseCase(petsRepository)
  })

  it('should be able to search pets by description', async () => {
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

    await petsRepository.create({
      org_id: 'pet-01',
      name: 'riven',
      city: '13270000',
      animal: 'cat',
      description: 'loved',
      images: '',
    })

    const { pets } = await sut.execute({
      description: 'happy',
      city: '13270000',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ description: 'happy' })])
  })

  it('should not be possible search without description params', async () => {
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
        description: '',
        city: '13270000',
        page: 1,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
