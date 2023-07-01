import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchAllPetsUseCaseRequest {
  query: string
  page: number
}

interface FetchAllPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchAllPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    page,
    query,
  }: FetchAllPetsUseCaseRequest): Promise<FetchAllPetsUseCaseResponse> {
    const postalCode = query.slice(0, 5).trim()

    if (postalCode.length < 5) {
      throw new ResourceNotFoundError()
    }
    const pets = await this.petsRepository.findManyPetsByCity(postalCode, page)

    return {
      pets,
    }
  }
}
