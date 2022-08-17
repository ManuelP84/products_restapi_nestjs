import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot(
      'mongodb+srv://manuelp84:Angie.cruz87@sofkacluster.jyaxe5e.mongodb.net/productdb',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
