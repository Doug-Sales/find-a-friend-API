import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { Pet } from '@prisma/client'

interface GetDetailsFromPetsUseCaseRequest {
  petId: string
}

interface GetDetailsFromPetsUseCaseResponse {
  details: {
    phone: string
    pet: Pet
  }
}

export class GetDetailsFromPetsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    petId,
  }: GetDetailsFromPetsUseCaseRequest): Promise<GetDetailsFromPetsUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    const org = await this.orgsRepository.findById(pet.org_id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const phone = org.phone

    return {
      details: {
        phone,
        pet,
      },
    }
  }
}
