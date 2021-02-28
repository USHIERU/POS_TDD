import TicketDAO from '../DAO/TicketDAO';
import TicketDTO from '../DTO/TicketDTO';
import ProductDTO from '../DTO/ProductDTO'

beforeEach(async () => {
    return await TicketDAO.clearDataBase();
});

afterAll(async () => {
    return await TicketDAO.clearDataBase();
});

describe('Tickets Test', () => {
    test('Add Ticket Prodcuts', () => {
        const product = new ProductDTO('lechuga', 2, 10);
        const product2 = new ProductDTO('tomate', 1, 5);
        const ticket = new TicketDTO('Ticket Test', '_waiterID', [product]);

        ticket.addProduct(product2);

        expect(ticket.total).toBe(15);
    });

    test('Delete Ticket Products', () => {
        const product = new ProductDTO('lechuga', 2, 10, [], '_testID1');
        const product2 = new ProductDTO('tomate', 1, 5, [], '_testID2');
        const ticket = new TicketDTO('Ticket Test', '_waiterID', [product, product2]);

        ticket.removeProduct(product2._id);

        expect(ticket.total).toBe(10);
    });

    test('Insert Ticket', async () => {
        const product = new ProductDTO('lechuga', 2, 10, [], '_testID1');
        const product2 = new ProductDTO('tomate', 1, 5, [], '_testID2');
        const ticket = new TicketDTO('Ticket Test', '_waiterID', [product, product2]);

        const response = await TicketDAO.insert(ticket);

        expect(response).toBeInstanceOf(TicketDTO);
    });

    test('Insert many Tickets', async () => {
        const product = new ProductDTO('lechuga', 2, 10, [], '_testID1');
        const product2 = new ProductDTO('tomate', 1, 5, [], '_testID2');
        const ticket = new TicketDTO('Ticket Test', '_waiterID', [product, product2]);

        const response = await TicketDAO.insertMany([ticket, ticket]);

        response.forEach(ticket =>
            expect(ticket).toBeInstanceOf(TicketDTO)
        )
    });

    test('Update Ticket', async () => {
        const product = new ProductDTO('lechuga', 2, 10, [], '_testID1');
        const product2 = new ProductDTO('tomate', 1, 5, [], '_testID2');
        const ticket = new TicketDTO('Ticket Test', '_waiterID', [product, product2]);

        const response = await TicketDAO.insert(ticket);
        response.description = 'New Description'
        const responseUpdate = await TicketDAO.update(response._id, response);

        expect(responseUpdate).toBeTruthy();
    });

    test('Find One Ticket', async () => {
        const product = new ProductDTO('lechuga', 2, 10, [], '_testID1');
        const product2 = new ProductDTO('tomate', 1, 5, [], '_testID2');
        const ticket = new TicketDTO('Ticket Test', '_waiterID', [product, product2]);

        const response = await TicketDAO.insert(ticket);
        const responseFind = await TicketDAO.findOne(response._id);

        expect(responseFind.description).toBe(response.description);
    });

    test('Get All Ticket', async () => {
        const product = new ProductDTO('lechuga', 2, 10, [], '_testID1');
        const product2 = new ProductDTO('tomate', 1, 5, [], '_testID2');
        const ticket = new TicketDTO('Ticket Test', '_waiterID', [product, product2]);

        await TicketDAO.insertMany([ticket, ticket]);
        const response = await TicketDAO.getAll();

        expect(response.length).toBe(2);
    });
})