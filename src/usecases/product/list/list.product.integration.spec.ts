import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list an products", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    const product1 = new Product("123", "John", 100);
    const product2 = new Product("321", "John", 200);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const input = {};
    const result = await usecase.execute(input);

    expect(result).toEqual({
      products: [
        { id: '123', name: 'John', price: 100 },
        { id: '321', name: 'John', price: 200 },
      ],
    });
  });
});
