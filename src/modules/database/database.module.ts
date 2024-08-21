// src/modules/database/database.module.ts
import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../../common/config/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ormconfig.options,
      dataSourceFactory: async () => {
        await ormconfig.initialize();
        return ormconfig;
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule implements OnModuleInit {
  private readonly logger = new Logger(DatabaseModule.name);

  async onModuleInit(): Promise<void> {
    try {
      if (ormconfig.isInitialized) {
        this.logger.log('Database connection is already established.');
      } else {
        this.logger.log(
          'Database connection not yet established. Attempting to connect...',
        );
        await ormconfig.initialize();
        this.logger.log('Database connection established successfully.');
      }
    } catch (error) {
      this.logger.error('Error during database connection:', error.message);
    }
  }
}
