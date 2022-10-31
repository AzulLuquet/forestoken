import { Module } from '@nestjs/common';
import { AffiliatesController } from '../controllers/affiliates.controller';
import { AffiliatesService } from '../services/affiliates.service';

@Module({
  controllers: [AffiliatesController],
  imports: [],
  providers: [AffiliatesService],
  exports: [AffiliatesService],
})
export class AffiliatesModule {}
