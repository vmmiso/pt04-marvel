const mongoose = require("mongoose");

const supertest = require('supertest');

const app = require('../src/app');
const server = require('../src/index');
const User = require('../src/models/User');

const api = supertest(app);


// const initialUsers = [
//     {
//         "username": "user1",
//         "password": "user1",
//     },
//     {
//         "username": "prueba1",
//         "password": "prueba1"
//     }
// ]

// beforeAll(async () => {
//     await User.deleteMany({});

//     initialUsers.map((user) => {
//         const user1 = new User(initialUser);
//          await user1.save();
//     });
// })

test('Login OK', async () => {
    await api
        .post('/api/auth/login')
        .send({username: "usuario1"})
        .expect(200)
        .expect({_id: "6271641910d9483f430e0b5d", "username": "usuario1"});
});

test('Login invalid', async () => {
    await api
        .post('/api/auth/login')
        .send({username: "wronguser"})
        .expect(401)
        // .end((err, res) => {
        //     if (err) return err;
        //     expect(res.body.message).toEqual("Wrong password or username!")
        // });
});


afterAll(async () => {
    await mongoose.connection.close();
    server.close();
});