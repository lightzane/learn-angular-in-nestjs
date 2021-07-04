import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class MoreThanOnePipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata): number;
}
