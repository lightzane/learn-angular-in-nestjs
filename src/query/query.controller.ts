import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { MoreThanOnePipe } from 'src/shared/pipes/more-than-one.pipe';
import { QueryService } from './query.service';

@Controller('query')
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @Get('fibonacci')
  getFibonacci(
    @Query('x', ParseIntPipe) x: number,
    @Query('y', ParseIntPipe) y: number,
    @Query('total', MoreThanOnePipe) total: number,
  ) {
    return this.queryService.getFibonacci(x, y, total);
  }
}
