import { UseGuards, applyDecorators } from '@nestjs/common';
import { ValidRoles } from '../enums/valid-roles';
import { RoleProtected } from './role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';

export function Auth(...rol: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...rol),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
