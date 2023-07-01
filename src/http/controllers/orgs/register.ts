import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.coerce.string().min(8),
    postalCode: z.coerce.string().regex(/^\d{5}-?\d{3}$/),
  })

  const { name, email, password, phone, postalCode } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
      phone,
      postalCode,
    })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return response.status(409).send({ message: error.message })
    }
    throw error
  }

  return response.status(201).send()
}
