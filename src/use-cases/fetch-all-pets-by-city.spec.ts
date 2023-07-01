import { describe, it, beforeEach, expect } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { FetchAllPetsUseCase } from './fetch-all-pets-by-city'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchAllPetsUseCase

describe('Fetch All Pets By City Use Case', () => {
  beforeEach(async () => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchAllPetsUseCase(petsRepository)
  })

  it('should be able to list all pets', async () => {
    await inMemoryOrgsRepository.create({
      id: 'pet-01',
      name: 'Petfind',
      email: 'pet@find.com',
      password_hash: '123456',
      phone: '19191919',
      postal_code: '13280000',
    })

    await petsRepository.create({
      org_id: 'pet-02',
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
      query: '13270',
      page: 1,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ animal: 'dog' }),
      expect.objectContaining({ animal: 'cat' }),
    ])
  })

  it('should not be possible list pets by city without query params', async () => {
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
        query: '',
        page: 1,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
