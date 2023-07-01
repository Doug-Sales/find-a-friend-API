import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { registerPet } from './register-pet'
import { fetchAllPetsByCity } from './fetch-all-pets-by.city'
import { searchPet } from './search-pets'
import { detailsPet } from './details-pet'
import { myPets } from './pets-by-org'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/list', fetchAllPetsByCity)
  app.get('/pets/search', searchPet)

  app.get('/pet/:petId/details', detailsPet)

  app.get('/pet/mypets', { onRequest: [verifyJWT] }, myPets)
  app.post(
    '/pet/:orgId/register',
    { onRequest: [verifyJWT, verifyUserRole('ADMIN')] },
    registerPet,
  )
}
