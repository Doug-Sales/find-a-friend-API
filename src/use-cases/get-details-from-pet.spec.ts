import { describe, it, beforeEach, expect } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { GetDetailsFromPetsUseCase } from './get-details-from-pet'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetDetailsFromPetsUseCase

describe('Get Details from Pet Use Case', () => {
  beforeEach(async () => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new GetDetailsFromPetsUseCase(petsRepository, inMemoryOrgsRepository)
  })

  it('should be able to get details by id', async () => {
    await inMemoryOrgsRepository.create({
      id: 'pet-01',
      name: 'Petfind',
      email: 'pet@find.com',
      password_hash: '123456',
      phone: '19191919',
      postal_code: '13270000',
    })

    const petId = await petsRepository.create({
      org_id: 'pet-01',
      name: 'caramelo',
      city: '13270000',
      animal: 'toto',
      description: 'happy',
      images: '',
    })

    const { details } = await sut.execute({
      petId: petId.id,
    })

    expect(details.pet.created_at).toEqual(expect.any(Date))
    expect(details).toEqual(expect.objectContaining({ phone: '19191919' }))
  })

  it('should not be able to get details without an id', async () => {
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
        petId: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
