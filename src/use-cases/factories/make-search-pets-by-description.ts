import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetsByDescriptionUseCase } from '../search-pets-by-description'

export function makeSearchByDescriptionPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const searchPetsUseCase = new SearchPetsByDescriptionUseCase(petsRepository)

  return searchPetsUseCase
}
