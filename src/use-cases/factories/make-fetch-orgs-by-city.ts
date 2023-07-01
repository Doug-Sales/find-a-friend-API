import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { FetchOrgsByCityUseCase } from '../fetch-orgs-by-city'

export function makeFetchOrgsByCityUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const fetchOrgsByCityUseCase = new FetchOrgsByCityUseCase(orgsRepository)

  return fetchOrgsByCityUseCase
}
