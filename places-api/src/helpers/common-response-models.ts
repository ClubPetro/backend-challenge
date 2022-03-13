import { HttpStatus } from '@nestjs/common';
import { IsString, IsNotEmpty, IsEmail, IsEnum, IsOptional } from 'class-validator';

export class CommonResponse {
    status: HttpStatus;
    data: any;

    @IsOptional()
    errors?: any[];
}