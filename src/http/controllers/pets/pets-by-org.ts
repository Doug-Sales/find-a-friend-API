import { makeFetchPetsByOrgUseCase } from '@/use-cases/factories/make-fetch-pets-by-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function myPets(request: FastifyRequest, response: FastifyReply) {
  const params = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const orgId = request.user.sub

  const { page } = params.parse(request.query)

  const myPetsUseCase = makeFetchPetsByOrgUseCase()

  const { pets } = await myPetsUseCase.execute({
    page,
    orgId,
  })

  return response.status(200).send({
    pets,
  })
}
