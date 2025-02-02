import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/roles/roles.enum';

// Custom decorator for role-based access control
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
