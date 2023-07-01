import { makeGetOrgProfileUseCase } from '@/use-cases/factories/make-get-org-profile'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, response: FastifyReply) {
  const getOrgProfile = makeGetOrgProfileUseCase()

  const { org } = await getOrgProfile.execute({
    orgId: request.user.sub,
  })

  Reflect.deleteProperty(org, 'password_hash')

  return response.status(200).send({
    org,
  })
}
