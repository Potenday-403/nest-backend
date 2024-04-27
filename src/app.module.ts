import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { TributeModule } from './tribute/tribute.module';
import { FriendModule } from './friend/friend.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [AuthModule, EventModule, TributeModule, FriendModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
