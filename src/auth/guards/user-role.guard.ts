import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLE } from '../decorators/role-protected.decorator';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRole: string[] = this.reflector.get(
      META_ROLE,
      context.getHandler(),
    );

    if (!validRole || validRole.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) throw new NotFoundException('User not found');

    if (validRole.includes(user.role)) {
      return true;
    }

    throw new ForbiddenException(`User ${user.fullName} need a valid role`);
  }
}
