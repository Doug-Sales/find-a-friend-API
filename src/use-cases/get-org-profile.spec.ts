import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { GetOrgProfileUseCase } from './get-org-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgProfileUseCase

describe('Get Org Profile Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgProfileUseCase(orgsRepository)
  })

  it('should be able to get org profile', async () => {
    const createdOrg = await orgsRepository.create({
      name: 'Petfind',
      email: 'pet@find.com',
      password_hash: await hash('123456', 6),
      phone: '19191919',
      postal_code: '13270000',
    })

    const { org } = await sut.execute({
      orgId: createdOrg.id,
    })

    expect(org.id).toEqual(expect.any(String))
    expect(org.name).toEqual('Petfind')
  })

  it('should not be able to get org profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        orgId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
