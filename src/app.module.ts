import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dataSource } from './datasource';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    BookmarkModule,
    // TypeOrmModule.forRootAsync({
    //   useFactory: async () => {
    //     return dataSource.options as TypeOrmModuleOptions;
    //   },
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const password: string | undefined =
          configService.get<string>('DB_PASSWORD');

        // TO-DO: Obtain and cache database password from Secret Manager

        return {
          ...dataSource.options,
          password,
          extra: configService.get<string>('DB_SOCKETPATH')
            ? { socketPath: configService.get<string>('DB_SOCKETPATH') }
            : {},
        } as TypeOrmModuleOptions;
      },
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
