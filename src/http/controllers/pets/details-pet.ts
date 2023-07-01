import { makeGetDetailsFromPetUseCase } from '@/use-cases/factories/make-get-details-from-pet'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function detailsPet(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const fetchAllPetsByCitySchema = z.object({
    petId: z.string().uuid(),
  })
  const { petId } = fetchAllPetsByCitySchema.parse(request.params)

  const getDetailsPetUseCase = makeGetDetailsFromPetUseCase()

  const { details } = await getDetailsPetUseCase.execute({
    petId,
  })

  Reflect.deleteProperty(details.pet, 'org_id')

  return response.status(200).send(details)
}
