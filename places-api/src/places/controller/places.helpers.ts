import { IsInt, IsOptional, Min } from "class-validator";
import { Type } from "class-transformer";

export const MAX_PAGE_SIZE = 10;
export class PaginatedData {
    data: any[];
    total: number;
    page: number;
    page_size: number;
}
export class GetPlacesQuery {
    @IsInt()
    @Type(() => Number)
    @IsOptional()
    @Min(1)
    page: number;
}
