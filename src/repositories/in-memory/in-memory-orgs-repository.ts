import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findByPostalCode(postalCode: string) {
    const query = postalCode.slice(0, 5).trim()
    return this.items.filter((item) =>
      item.postal_code.includes(query) ? item.id : null,
    )
  }

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      postal_code: data.postal_code,
      phone: data.phone,
      created_at: new Date(),
    }
    this.items.push(org)

    return org
  }
}
