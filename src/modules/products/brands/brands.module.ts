import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Brand, BrandSchema } from './entity/brand.entity';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Brand.name,
        schema: BrandSchema,
      },
    ]),
  ],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
