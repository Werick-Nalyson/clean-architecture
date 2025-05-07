import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import Product from "../../../domain/product/entity/product";

export default class CreateCustomerUseCase {
  private productRepositoryInterface: ProductRepositoryInterface;

  constructor(productRepositoryInterface: ProductRepositoryInterface) {
    this.productRepositoryInterface = productRepositoryInterface;
  }

  async execute(
    input: InputCreateProductDto
  ): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create(
      'a',
      input.name,
      input.price
    ) as Product;

    await this.productRepositoryInterface.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
