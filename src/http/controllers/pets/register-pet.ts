import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerPet(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const registerPetParamsSchema = z.object({
    orgId: z.string().uuid(),
  })

  const registerPetBodySchema = z.object({
    name: z.string(),
    city: z.coerce.string().regex(/^\d{5}-?\d{3}$/),
    animal: z.string(),
    description: z.string().nullable(),
    images: z.string().nullable(),
  })

  const { orgId } = registerPetParamsSchema.parse(request.params)
  const { animal, city, description, images, name } =
    registerPetBodySchema.parse(request.body)

  const registerPetUseCase = makeRegisterPetUseCase()

  await registerPetUseCase.execute({
    orgId,
    animal,
    name,
    city,
    description,
    images,
  })

  return response.status(201).send()
}
