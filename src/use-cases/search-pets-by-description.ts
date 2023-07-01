import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface SearchPetsByDescriptionUseCaseRequest {
  description: string
  page: number
  city: string
}

interface SearchPetsByDescriptionUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsByDescriptionUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    page,
    description,
    city,
  }: SearchPetsByDescriptionUseCaseRequest): Promise<SearchPetsByDescriptionUseCaseResponse> {
    const postalCode = city.slice(0, 5).trim()

    if (description.trim().length < 1) {
      throw new ResourceNotFoundError()
    }

    const pets = await this.petsRepository.searchMany(
      description,
      page,
      postalCode,
    )

    return {
      pets,
    }
  }
}
