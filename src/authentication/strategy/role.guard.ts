import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRole } from '../../enum/UserRole.enum';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Comparer le tableau de role requis par le decorateur @Roles() et le role du user
   * @param roles les roles requis
   * @param userRole le role de l'utlisateur
   * @private
   */
  private matchRoles(roles: UserRole[], userRole: UserRole): boolean {
    return roles.some((role) => role === userRole);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!requireRoles) {
      return true;
    }
    return this.matchRoles(requireRoles, user.role);
  }
}
