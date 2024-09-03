import supertest from "supertest";
import {web} from "../src/application/web.js";
import {prismaClient} from "../src/application/database.js";
import {logger} from "../src/application/logging.js";

describe('POST /api/users', function () {

    afterEach(async () => {
        await prismaClient.user.deleteMany({
                where: {
                    username: "irwan"
                }
            }
        );
    })

    it('should can register new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: "irwan",
                password: "123456",
                name: "Irwan Ramadhan"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("irwan");
        expect(result.body.data.name).toBe("Irwan Ramadhan");
        expect(result.body.data.password).toBeUndefined();
    });

    it('should reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: "",
                password: "",
                name: ""
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    })

    it('should reject if username already registered', async () => {
        let result = await supertest(web)
            .post('/api/users')
            .send({
                username: "irwan",
                password: "123456",
                name: "Irwan Ramadhan"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("irwan");
        expect(result.body.data.name).toBe("Irwan Ramadhan");
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web)
            .post('/api/users')
            .send({
                username: "irwan",
                password: "123456",
                name: "Irwan Ramadhan"
            });

        // logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
})