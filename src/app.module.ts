import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { TributeModule } from './tribute/tribute.module';
import { FriendModule } from './friend/friend.module';

@Module({
  imports: [UserModule, AuthModule, EventModule, TributeModule, FriendModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
