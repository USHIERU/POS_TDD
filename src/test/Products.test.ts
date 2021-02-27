import ProductDAO from '../DAO/ProductDAO';
import ProductDTO from '../DTO/ProductDTO';
import IngredientDTO from '../DTO/IngredientDTO';

beforeEach(async () => {
    return await ProductDAO.clearDataBase();
});

afterAll(async () => {
    return await ProductDAO.clearDataBase();
});

describe('Products Test', () => {
    test('Add Ingredient', () => {
        const productDTO = new ProductDTO('Hamburguesa', 5, 50);
        const ingredient1 = new IngredientDTO('carne', 10);

        productDTO.addIngredient(ingredient1)

        expect(productDTO.recipe.length).toBe(1)
    });

    test('Add Ingredients', () => {
        const productDTO = new ProductDTO('Hamburguesa', 5, 50);
        const ingredient1 = new IngredientDTO('carne', 10);
        const ingredient2 = new IngredientDTO('lechuga', 5);
        const ingredient3 = new IngredientDTO('tomate', 7);

        productDTO.addIngredients([ingredient1, ingredient2, ingredient3])

        expect(productDTO.recipe.length).toBe(3)
    });

    test('Delete Ingredients', () => {
        const productDTO = new ProductDTO('Hamburguesa', 5, 50);
        const ingredient1 = new IngredientDTO('carne', 10, 10, '_carne');
        const ingredient2 = new IngredientDTO('lechuga', 5, 10, '_lechuga');
        const ingredient3 = new IngredientDTO('tomate', 7, 10, '_tomate');

        productDTO.addIngredients([ingredient1, ingredient2, ingredient3])
        productDTO.deleteIngredient('_tomate');

        expect(productDTO.recipe.length).toBe(2)
    });

    test('Insert Product', async () => {
        const productDTO = new ProductDTO('productTest', 10, 50);
        const response = await ProductDAO.insert(productDTO);

        expect(response).toBeInstanceOf(ProductDTO);
    });

    test('Insert many Products', async () => {
        const productsDTO = [
            new ProductDTO('productTest', 10, 50),
            new ProductDTO('productTest2', 10, 50)
        ]

        const response = await ProductDAO.insertMany(productsDTO);

        response.forEach(product =>
            expect(product).toBeInstanceOf(ProductDTO)
        );
    });

    test('Update Products', async () => {
        const productDTO = new ProductDTO('productTest', 10, 50);
        const response = await ProductDAO.insert(productDTO);

        response.name = 'productTestUpdate'

        const responseUpdate = await ProductDAO.update(response._id, response);

        expect(responseUpdate).toBeTruthy();
        expect(response.name).toBe('productTestUpdate');
    });

    test('Find One Products', async () => {
        const productDTO = new ProductDTO('productTest', 10, 50);
        const responseInsert = await ProductDAO.insert(productDTO);

        const responseFind = await ProductDAO.findOne(responseInsert._id);

        expect(responseFind.name).toBe(responseInsert.name);
    });

    test('Get All Productss', async () => {
        const productsDTO = [
            new ProductDTO('productTest', 10, 50),
            new ProductDTO('productTest2', 10, 50)
        ]
        const response = await ProductDAO.insertMany(productsDTO);

        const getAll = await ProductDAO.getAll();

        expect(response.length).toBe(getAll.length);
    });
})