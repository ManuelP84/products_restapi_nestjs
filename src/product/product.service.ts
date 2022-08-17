import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';
import { validateMongoId } from './helpers/validator.js';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async getProduct(productId: string): Promise<Product> {
    validateMongoId(productId);
    const product = await this.productModel.findById(productId);
    return product;
  }

  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const productCreated = new this.productModel(createProductDTO);
    await productCreated.save();
    return productCreated;
  }

  async updateProduct(
    productId: string,
    createProductDTO: CreateProductDTO,
  ): Promise<Product> {
    const productUpdated = await this.productModel.findByIdAndUpdate(
      productId,
      createProductDTO,
      { new: true },
    );
    return productUpdated;
  }

  async deleteProduct(productId: string): Promise<Product> {
    validateMongoId(productId);
    const productDeleted = await this.productModel.findByIdAndDelete(productId);
    return productDeleted;
  }
}
