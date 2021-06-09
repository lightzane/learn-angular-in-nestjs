import { Body, Controller, Post } from '@nestjs/common';
import { BodyService } from './body.service';

@Controller('body')
export class BodyController {
  constructor(private readonly bodyService: BodyService) {}

  @Post()
  submitPOST(@Body() data: any): any {
    return this.bodyService.submitPOST(data);
  }
}
