import { IsInt, IsOptional, Min } from "class-validator";
import { Type } from "class-transformer";

export class GetPlacesQuery {
    @IsInt()
    @Type(() => Number)
    @IsOptional()
    @Min(1)
    page: number;

    @IsInt()
    @Type(() => Number)
    @IsOptional()
    @Min(1)
    limit?: number;
}