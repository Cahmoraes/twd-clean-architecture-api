import { Router } from 'express'
import { makeRegisterUserController } from '@/main/factories'
import { adaptRoute } from '@/main/adapters'

export default (router: Router): void => {
  const registerUserController = makeRegisterUserController()
  router.post('/register', adaptRoute(registerUserController))
}
