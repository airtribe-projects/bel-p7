const expect = require('chai').expect;
const User = require('../../models/user');
const bcrypt = require('bcrypt');

describe("Creating the documents in mongodb - Without Mocking", () => {
    it("Creates a new user successfully ", (done) => {
        const user = new User({
            fullName: "test",
            email: "test123@gmail.com",
            role: "admin",
            password: bcrypt.hashSync("test1234", 8)
        });
        user.save().then((user) => {
            expect(user.fullName).eq("test")
            done();
        }).catch(err => {
            done(err);
        });
    }).timeout(50000);

    it("Validates the email of the user and does not save if the email is invalid", (done) => {
        const user = new User({
            fullName: "test",
            email: "test@123@gmail.com",
            role: "admin",
            password: bcrypt.hashSync("test1234", 8)
        });
        user.save().then((user) => {
            done();
        }).catch(err => {
            expect(err._message).eq("User validation failed");
            done();
        });
    });

    it("Validates the presence of all the fields of the user - does not save if the fields are not present", (done) => {
        const user = new User({
            fullName: "test",
            role: "admin",
            password: bcrypt.hashSync("test1234", 8)
        });
        user.save().then((user) => {
            done();
        }).catch(err => {
            expect(err._message).eq("User validation failed");
            done();
        });
    });

    it("Validates the role of the user and does not sabe if the role is anything other than admin, normal", (done) => {
        const user = new User({
            fullName: "test",
            email: "test@123@gmail.com",
            role: "bornak",
            password: bcrypt.hashSync("test1234", 8)
        });
        user.save().then((user) => {
            done();
        }).catch(err => {
            expect(err._message).eq("User validation failed");
            console.log(err);
            done();
        });
    });
});
