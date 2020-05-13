export default class User {
    public readonly _id: string;

    public readonly age: number;

    public readonly name: string;

    public readonly lastName: string;

    public readonly creationDate: Date;

    constructor(name: string) {
        this._id = 'test';
        this.name = name;
        this.age = 11;
        this.lastName = 'Smith';
        this.creationDate = new Date();
    }

    public toString() {
        return `UserID: ${this._id}, Age: ${this.age}, Name: ${this.name}, LastName: ${this.lastName}`;
    }
}
