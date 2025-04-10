import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from './auth.service'

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService)
  const router = inject(Router)

  if(auth.isLoggedIn()){
    return true
  } else {
    router.navigate(['/login'])
    return false
  }
  return true;
}
