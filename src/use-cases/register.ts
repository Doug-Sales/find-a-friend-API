import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { validateInputDataToRegister } from '@/utils/validate-input-data-to-register'
import { DataMissingError } from './errors/some-data-missing-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string
  postalCode: string
}

interface RegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    phone,
    postalCode,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)
    const isInvalidInputData = validateInputDataToRegister(phone, postalCode)

    if (isInvalidInputData) {
      throw new DataMissingError()
    }

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      phone,
      postal_code: postalCode,
      password_hash,
    })

    return {
      org,
    }
  }
}
