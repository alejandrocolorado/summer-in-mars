"use strict";

class Validator {
  constructor() {
    this.invalidEmailError = "Invalid email you chum";
    this.emailExistsError = "Oh, too slow, email is already taken";
    this.passwordError = "Password is too short, pump up those numbers rookie";
    this.repeatPasswordError = "Doh' Passwords don't match";

    this.errors = {
      invalidEmailError: this.invalidEmailError,
      passwordError: this.passwordError,
      repeatPasswordError: this.repeatPasswordError,
    };
  }

  validateValidEmail = (email) => {
    if (this.emailIsValid(email)) {
      delete this.errors.invalidEmailError;
    } else {
      this.errors.invalidEmailError = this.invalidEmailError;
    }
  };

  emailIsValid = (email) => {
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    const isValid = emailRegEx.test(email);

    return isValid;
  };

  validateUniqueEmail = (newEmail) => {
    const usersDb = db.getAllUsers();

    let emailUnique = true;

    if (usersDb.length > 0) {
      usersDb.forEach((userObj) => {
        if (userObj.email === newEmail) {
          emailUnique = false;
        }
      });

      if (emailUnique) {
        delete this.errors.emailExistsError;
      } else {
        this.errors.emailExistsError = this.emailExistsError;
      }
    }
  };

  validatePassword = (password) => {
    if (password.length > 5) {
      delete this.errors.passwordError;
    } else {
      this.errors.passwordError = this.passwordError;
    }
  };

  validatePasswordRepeat = (password, passwordRepeat) => {
    if (password === passwordRepeat) {
      delete this.errors.repeatPasswordError;
    } else {
      this.errors.repeatPasswordError = this.repeatPasswordError;
    }
  };

  getErrors = () => {
    return this.errors;
  };

  resetValidator = () => {
    this.errors = {
      invalidEmailError: this.invalidEmailError,
      passwordError: this.passwordError,
      repeatPasswordError: this.repeatPasswordError,
    };
  };
}

const validator = new Validator();
