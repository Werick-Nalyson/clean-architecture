import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import CreateProductUseCase from "../create/create.product.usecase";

describe("Test update product use case", () => {
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

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const usecase = new UpdateProductUseCase(productRepository);

    const product1 = await createProductUseCase.execute({
      name: 'batery',
      price: 100
    });

    const product1Updated = await usecase.execute({
      id: product1.id,
      name: 'batery updated',
      price: 150
    });

    expect(product1Updated.id).toEqual(product1.id);
    expect(product1Updated.name).toEqual('batery updated');
    expect(product1Updated.price).toEqual(150);
  });
});
