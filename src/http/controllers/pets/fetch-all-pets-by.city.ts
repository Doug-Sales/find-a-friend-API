import { makeFetchAllPetsByCityUseCase } from '@/use-cases/factories/make-fetch-all-pets-by-city'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchAllPetsByCity(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const fetchAllPetsByCitySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    query: z.coerce.string().regex(/^\d{5}-?\d{3}$/),
  })
  const { page, query } = fetchAllPetsByCitySchema.parse(request.query)

  const fetchAllPetsByCityUseCase = makeFetchAllPetsByCityUseCase()

  const { pets } = await fetchAllPetsByCityUseCase.execute({
    page,
    query,
  })

  return response.status(200).send({
    pets,
  })
}
