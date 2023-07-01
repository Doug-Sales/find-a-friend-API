import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchOrgsByCityUseCaseRequest {
  query: string
}

interface FetchOrgsByCityUseCaseResponse {
  orgs: Org[]
}

export class FetchOrgsByCityUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    query,
  }: FetchOrgsByCityUseCaseRequest): Promise<FetchOrgsByCityUseCaseResponse> {
    const postalCode = query.slice(0, 5).trim()

    if (postalCode.length < 5) {
      throw new ResourceNotFoundError()
    }

    const orgs = await this.orgsRepository.findByPostalCode(postalCode)

    return {
      orgs,
    }
  }
}
