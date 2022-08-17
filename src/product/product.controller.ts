import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Req,
  Param,
  Query,
} from '@nestjs/common';

import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
import { validateIfProductExists } from './helpers/validator';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create')
  async create(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Product created successfully',
      product,
    });
  }

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({
      products,
    });
  }

  @Get('/:id')
  async getProductById(@Res() res, @Req() req, @Param('id') productId) {
    // Can also use @Req() res  -->  const { id } = req.params;
    const product = await this.productService.getProduct(productId);
    validateIfProductExists(productId, product);
    return res.status(HttpStatus.OK).json({
      product,
    });
  }

  @Delete('/delete/:id')
  async deleteProduct(@Res() res, @Param('id') productId) {
    // Can also use @Query('id')
    const product = await this.productService.deleteProduct(productId);
    validateIfProductExists(productId, product);
    return res.status(HttpStatus.OK).json({
      messsage: `Product with id: ${productId} deleted.`,
      product,
    });
  }

  @Put('/update')
  async updateProduct(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
    @Query('id') productId,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productId,
      createProductDTO,
    );
    validateIfProductExists(productId, updatedProduct);
    return res.status(HttpStatus.ACCEPTED).json({
      message: `Product with id: ${productId} updated.`,
      updatedProduct,
    });
  }
}
