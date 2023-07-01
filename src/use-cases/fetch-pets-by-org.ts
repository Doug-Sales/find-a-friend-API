import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchPetsByOrgUseCaseRequest {
  orgId: string
  page: number
}

interface FetchPetsByOrgUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByOrgUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    page,
    orgId,
  }: FetchPetsByOrgUseCaseRequest): Promise<FetchPetsByOrgUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pets = await this.petsRepository.findManyPetsByOrg(org.id, page)

    return {
      pets,
    }
  }
}
