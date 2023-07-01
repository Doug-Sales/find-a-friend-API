import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { GetOrgProfileUseCase } from '../get-org-profile'

export function makeGetOrgProfileUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const getOrgProfileUseCase = new GetOrgProfileUseCase(orgsRepository)

  return getOrgProfileUseCase
}
