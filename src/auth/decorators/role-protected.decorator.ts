import { SetMetadata } from '@nestjs/common';

export const META_ROLE = 'rol';
export const RoleProtected = (...arg: string[]) => SetMetadata(META_ROLE, arg);
