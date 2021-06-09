import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class MoreThanOnePipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): number {
    const n = parseInt(value);

    if (isNaN(n)) {
      throw new BadRequestException(
        `Lightzane: The value of Total is not a number: ${value}`,
      );
    }

    if (n < 2) {
      throw new BadRequestException(`Lightzane: Total should be more than 1`);
    }

    return n;
  }
}
