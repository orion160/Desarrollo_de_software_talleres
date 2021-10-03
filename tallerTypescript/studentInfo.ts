export class StudentInfo {
    code: number;
    dni: number;
    age: number;
    address: string;
    telephone: number;

    constructor(code: number, dni: number, age: number, address: string, telephone: number) {
        this.code = code;
        this.dni = dni;
        this.age = age;
        this.address = address;
        this.telephone = telephone;
    }
}

