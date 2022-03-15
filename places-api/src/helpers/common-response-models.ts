import { HttpStatus } from '@nestjs/common';
import { IsString, IsNotEmpty, IsEmail, IsEnum, IsOptional } from 'class-validator';

export class JSONResponse {
    status: HttpStatus;
    data: any;

    @IsOptional()
    errors?: any[];
}

export const CommonJSONResponses = {
    success: (responseData?: any) => { return { status: HttpStatus.OK, data: responseData } },
}