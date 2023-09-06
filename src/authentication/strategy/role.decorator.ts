import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../enum/UserRole.enum';

/**
 * Decorateur personalisé en relation avec le RoleGuard permet de creer un guard suivant les roles autorisés
 * sur une requete http
 * @param roles UserRole.enum
 * @constructor
 */
export const Role = (...roles: UserRole[]) => SetMetadata('role', roles);
