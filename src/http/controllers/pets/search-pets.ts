import { makeSearchByDescriptionPetsUseCase } from '@/use-cases/factories/make-search-pets-by-description'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchPet(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const searchPetSchema = z.object({
    city: z.coerce.string().regex(/^\d{5}-?\d{3}$/),
    description: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { page, description, city } = searchPetSchema.parse(request.query)

  const searchPetUseCase = makeSearchByDescriptionPetsUseCase()

  const { pets } = await searchPetUseCase.execute({
    description,
    page,
    city,
  })

  return response.status(200).send({
    pets,
  })
}
