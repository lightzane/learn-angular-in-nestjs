import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BodyModule } from './body/body.module';
import { ParamModule } from './param/param.module';
import { QueryModule } from './query/query.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './config/.env',
      isGlobal: true,
    }),
    BodyModule,
    ParamModule,
    QueryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
