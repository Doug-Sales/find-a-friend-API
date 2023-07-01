import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByOrgUseCase } from '../fetch-pets-by-org'

export function makeFetchPetsByOrgUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const fetchPetsByOrgsUseCase = new FetchPetsByOrgUseCase(
    petsRepository,
    orgsRepository,
  )

  return fetchPetsByOrgsUseCase
}
