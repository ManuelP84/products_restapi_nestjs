import { NotFoundException } from '@nestjs/common';

export const validateMongoId = (productId: string) => {
  if (productId.length !== 24)
    throw new NotFoundException(`The id: ${productId} is not valid`);
};

export const validateIfProductExists = (productId: string, product) => {
  if (!product)
    throw new NotFoundException(`Product with id: ${productId} not found.`);
};
