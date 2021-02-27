import UserDAO from './../DAO/UserDAO';
import UserDTO from './../DTO/UserDTO';

beforeEach(async () => {
    return await UserDAO.clearDataBase();
});

describe('User Tests', () => {
    test('Insert User', async () => {
        const userDTO = new UserDTO('Ushieru', 'Kokoran', 'mesero', 777, 1, 'ushieru', 2997);

        const userDTOResponse = await UserDAO.insert(userDTO);

        expect(userDTOResponse).toBeTruthy();
    });

    test('Insert many Users', async () => {
        const usersDTO = [
            new UserDTO('Ushieru', 'kokoran', 'mesero', 777, 1, 'qwe', 29972),
            new UserDTO('Ushieru', 'kokoran', 'mesero', 777, 1, 'asd', 29973),
            new UserDTO('Ushieru', 'kokoran', 'mesero', 777, 1, 'qwea', 29971)
        ]

        const manyUsers = await UserDAO.insertMany(usersDTO);

        expect(manyUsers).toBeTruthy();
    });

    test('Update User', async () => {
        const userDTO = new UserDTO('Ushieru', 'Kokoran', 'mesero', 777, 1, 'ushieru', 2997);
        const userDTOResponse = await UserDAO.insert(userDTO);

        const response = await UserDAO.update(userDTOResponse._id, userDTOResponse);

        expect(response).toBeTruthy();
    });

    test('Find One User', async () => {
        const userDTO = new UserDTO('Ushieru', 'Kokoran', 'mesero', 777, 1, 'ushieru', 2997);

        const insertResponse = await UserDAO.insert(userDTO);

        const findResponse = await UserDAO.findOne(insertResponse._id);

        expect(insertResponse._id).toBe(findResponse._id);
    });

    test('Get All Users', async () => {
        const usersDTO = [
            new UserDTO('Ushieru', 'kokoran', 'mesero', 777, 1, 'qwe', 29972),
            new UserDTO('Ushieru', 'kokoran', 'mesero', 777, 1, 'asd', 29973),
            new UserDTO('Ushieru', 'kokoran', 'mesero', 777, 1, 'qwea', 29971)
        ]

        const manyUsers = await UserDAO.insertMany(usersDTO);

        const findResponse = await UserDAO.getAll();

        expect(manyUsers.length).toBe(findResponse.length);
    });
});