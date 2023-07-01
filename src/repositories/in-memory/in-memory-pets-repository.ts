import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findManyPetsByOrg(id: string, page: number) {
    return this.items
      .filter((item) => item.org_id === id)
      .slice((page - 1) * 20, page * 20)
  }

  async findManyPetsByCity(query: string, page: number) {
    const params = query.slice(0, 5)
    return this.items.filter((item) =>
      item.city.includes(params) ? item : null,
    )
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.description?.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      animal: data.animal,
      city: data.city,
      name: data.name,
      description: data.description ?? null,
      images: data.images ?? null,
      org_id: data.org_id,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
