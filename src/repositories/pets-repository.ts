import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findManyPetsByCity(query: string, page: number): Promise<Pet[]>
  findManyPetsByOrg(id: string, page: number): Promise<Pet[]>
  searchMany(params: string, page: number, city: string): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
