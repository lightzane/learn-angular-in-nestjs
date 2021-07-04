import { Module } from '@nestjs/common';
import { ParamService } from './param.service';
import { ParamController } from './param.controller';

@Module({
  providers: [ParamService],
  controllers: [ParamController]
})
export class ParamModule {}
