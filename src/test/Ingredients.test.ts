import IngredientDAO from './../DAO/IngredientDAO';
import IngredientDTO from './../DTO/IngredientDTO';

beforeEach(async () => {
    return await IngredientDAO.clearDataBase();
});

afterAll(async () => {
    return await IngredientDAO.clearDataBase();
});

describe('Ingredients Test', () => {
    test('Insert Ingredient', async () => {
        const ingredientDTO = new IngredientDTO('Cebolla', 30);
        const insertResponse = await IngredientDAO.insert(ingredientDTO);

        expect(insertResponse).toBeTruthy();
    });

    test('Insert Many Ingredient', async () => {
        const ingredientDTO = [
            new IngredientDTO('Cebolla', 30),
            new IngredientDTO('Jitomate', 30),
            new IngredientDTO('Lechuga', 30),
        ];

        const insertResponse = await IngredientDAO.insertMany(ingredientDTO);
        expect(insertResponse).toBeTruthy();
    });

    test('Update Ingredient', async () => {
        const ingredientDTO = new IngredientDTO('Queso', 30);

        const insertResponse = await IngredientDAO.insert(ingredientDTO);

        insertResponse.name = 'Mantequilla';
        const updateResponse = await IngredientDAO.update(insertResponse._id, insertResponse);

        expect(updateResponse).toBeTruthy();
    });

    test('Find Ingredient', async () => {
        const ingredientDTO = new IngredientDTO('Queso', 30);

        const insertResponse = await IngredientDAO.insert(ingredientDTO);

        const findResponse = await IngredientDAO.findOne(insertResponse._id);

        expect(insertResponse.name).toBe(findResponse.name);
    });

    test('Get All Ingredient', async () => {
        const ingredientDTO = [
            new IngredientDTO('Cebolla', 30),
            new IngredientDTO('Jitomate', 30),
            new IngredientDTO('Lechuga', 30),
        ];

        await IngredientDAO.insertMany(ingredientDTO);

        const getAllResponse = await IngredientDAO.getAll();

        expect(ingredientDTO.length).toBe(getAllResponse.length);
    });

});