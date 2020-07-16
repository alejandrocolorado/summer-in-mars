'use strict'

class User {
    constructor (name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    }

}

const newUser = createUser (name, email, password);