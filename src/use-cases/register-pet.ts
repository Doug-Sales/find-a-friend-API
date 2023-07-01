import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RegisterPetUseCaseRequest {
  orgId: string
  name: string
  city: string
  animal: string
  description: string | null
  images: string | null
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    orgId,
    animal,
    name,
    city,
    description,
    images,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const orgIdentifier = await this.orgsRepository.findById(orgId)

    if (!orgIdentifier) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      org_id: orgIdentifier.id,
      name,
      city,
      animal,
      description,
      images,
    })

    return {
      pet,
    }
  }
}
