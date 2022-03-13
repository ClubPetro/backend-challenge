import { IsString, IsNotEmpty, IsEmail, IsEnum, IsOptional, isIn, IsInt } from 'class-validator';
export class PaginatedData {
    items: any[];

    @IsOptional()
    meta?: PaginatedDataMetaData
}

export class PaginatedDataMetaData {
    @IsOptional()
    @IsInt()
    total_item_count?: number;
    @IsOptional()
    @IsInt()
    total_page_count?: number;

    @IsOptional()
    @IsInt()
    current_page?: number;

    @IsOptional()
    @IsInt()
    current_page_item_count?: number;

    @IsOptional()
    @IsInt()
    max_items_per_page?: number;

    @IsOptional()
    observations?: any[];

}