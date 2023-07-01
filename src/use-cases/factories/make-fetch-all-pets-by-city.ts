import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchAllPetsUseCase } from '../fetch-all-pets-by-city'

export function makeFetchAllPetsByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const fetchAllPetsByCityUseCase = new FetchAllPetsUseCase(petsRepository)

  return fetchAllPetsByCityUseCase
}
