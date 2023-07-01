import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetDetailsFromPetsUseCase } from '../get-details-from-pet'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeGetDetailsFromPetUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const petsRepository = new PrismaPetsRepository()
  const getDetailsFromPetsUseCase = new GetDetailsFromPetsUseCase(
    petsRepository,
    orgsRepository,
  )

  return getDetailsFromPetsUseCase
}
