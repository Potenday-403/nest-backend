import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configs/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Social } from 'src/auth/entities/social.entity';
import { Tribute } from 'src/tribute/entities/tribute.entity';
import { Event } from 'src/event/entities/event.entity';
import { EventFriend } from 'src/event/entities/eventFriend.entity';
import { Friend } from 'src/friend/entities/friend.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        database: configService.get<string>('database.name'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.pass'),
        // entities: [__dirname + '/../**/entities/*.entity.d.ts'],
        entities: [User, Social, Tribute, Event, EventFriend, Friend],
        synchronize: true,
        // debug: configService.get<string>('env') === 'development',
        debug: false,
        logging: ['info', 'query', 'error', 'log', 'schema', 'warn'],
      }),
    }),
  ],
})
export class SharedModule {}
