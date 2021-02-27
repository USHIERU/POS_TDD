import ProductDAO from './../DAO/ProductDAO';
import ProductDTO from './../DTO/ProductDTO';

beforeEach(async () => {
    return await ProductDAO.clearDataBase();
});

describe('Products Test', () => {
    test('Insert User', async () => {
        expect(0).toBe(0);
    });

    test('Insert many Users', async () => {
        expect(0).toBe(0);
    });

    test('Update User', async () => {
        expect(0).toBe(0);
    });

    test('Find One User', async () => {
        expect(0).toBe(0);
    });

    test('Get All Users', async () => {
        expect(0).toBe(0);
    });
})