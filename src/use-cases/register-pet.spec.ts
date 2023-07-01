import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterPetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to register pet', async () => {
    await orgsRepository.create({
      id: 'pet-01',
      name: 'Petfind',
      email: 'pet@find.com',
      password_hash: '123456',
      phone: '19191919',
      postal_code: '13270000',
    })

    const { pet } = await sut.execute({
      orgId: 'pet-01',
      name: 'caramelo',
      city: '13270000',
      animal: 'toto',
      description: 'happy',
      images: '',
    })

    expect(pet.org_id).toEqual('pet-01')
  })

  it('should not be able to register pet without org id', async () => {
    await orgsRepository.create({
      id: 'pet-01',
      name: 'Petfind',
      email: 'pet@find.com',
      password_hash: '123456',
      phone: '19191919',
      postal_code: '13270000',
    })

    await expect(() =>
      sut.execute({
        orgId: 'pet',
        name: 'caramelo',
        city: '13270000',
        animal: 'toto',
        description: 'happy',
        images: '',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
