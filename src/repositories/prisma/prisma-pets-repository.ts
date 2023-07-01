import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findManyPetsByOrg(id: string, page: number) {
    const pet = await prisma.pet.findMany({
      where: {
        org_id: {
          equals: id,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return pet
  }

  async findManyPetsByCity(query: string, page: number) {
    const pet = await prisma.pet.findMany({
      where: {
        city: {
          startsWith: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return pet
  }

  async findById(id: string) {
    const pet = prisma.pet.findFirst({
      where: {
        id,
      },
    })
    return pet
  }

  async searchMany(params: string, page: number, city: string) {
    const pet = await prisma.pet.findMany({
      where: {
        description: {
          contains: params,
        },
        city: {
          startsWith: city,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
