'use strict'
// 1. construye la clase con la estructura macro
class SignUp {
    constructor () {
        this.nameInput = document.querySelector("#name")
        this.emailInput = document.querySelector("#email")
        this.passwordInput = document.querySelector("#password")
        this.repeatPasswordInput = document.querySelector("#repeat-password")

        this.buttonInput = document.querySelector('#signup-button')
        this.errorsWrapper = document.querySelector(".message-container")

    }

    // 2. Gestiona entradas del input "email"
    handleEmailInput = (event) => {
        const email = event.target.value;

        //validar

        validator.validateValidEmail (email);

        const errors = validator.getErrors();

        // validar si el nombre del email es valido

        if (!errors.invalidEmailError) {
            validator.validateUniqueEmail(email);
        }

        this.setErrorMessages();

    }

    // 2. Gestiona entradas del input "password"
    handlePasswordInput = (event) => {
        const password = event.target.value;
        const passwordRepeat = this.repeatPasswordInput.value;

        validator.validatePassword(password);
        validator.validatePasswordRepeat(password, passwordRepeat);

        this.setErrorMessages();
    }

    //2. Gestiona entradas del input "repeat-password"
    handleRepatPasswordInput = (event) => {
        const passwordRepeat = event.target.value;
        const password = this.passwordInput.value;

        validator.validatePassword(password);
        validator.validatePasswordRepeat(password, passwordRepeat);
        
        this.setErrorMessages();
    }

    // 2. Gestiona envio de datos con "submit"
    sendData = (event) => {
        //Evita que la pagina se recarge con el boton submit
        event.preventDefault();
        // 3. Recojer el input de todos los campos
        const name = this.nameInput.value;
        const email = this.emailInput.value;
        const password = this.passwordInput.value;
        const repeatPassword = this.repeatPasswordInput.value;



        const newUser = new User(name, email, password);

        // 4. Guadar usuario en la base de datos

        db.saveNewUser(newUser);

        // 5. Vaciar los inputs

        this.nameInput.value = "";
        this.emailInput.value = "";
        this.passwordInput.value = "";
        this.repeatPasswordInput.value = "";

        this.showSucessMessage();
        this.removeMessages();
    }

    // 2.Registrar funciones para cada input
    addListeners = () => {
        this.emailInput.addEventListener("input", this.handleEmailInput);
        this.passwordInput.addEventListener("input", this.handlePasswordInput);
        this.repeatPasswordInput.addEventListener("input", this.handleRepatPasswordInput);

        this.buttonInput.addEventListener("click", this.sendData)
    }

    showSucessMessage () {
        this.errorsWrapper.innerHTML = "";

        const errorsObj = validator.getErrors();
        const errorsStringArr = Object.values(errorsObj);

        if (errorsStringArr.length > 1) {
            return;
        }
        const successMessageP = document.createElement('p');
        successMessageP.innerHTML = "You did it, you crazy son of a bitch, you did it!";

            this.errorsWrapper.appendChild(successMessageP);
    }

    removeMessages = () => {
        setTimeout (() => {
            this.errorsWrapper.innerHTML = "";
        }, 1500) 
    }

    setErrorMessages = () => {
        this.errorsWrapper.innerHTML = "";

        const errorsObj = validator.getErrors();

        const errorsStringArr = Object.values(errorsObj);

        errorsStringArr.forEach ((errorStr) => {
            const errorMessageP = document.createElement('p');
            errorMessageP.innerHTML = errorStr;

            this.errorsWrapper.appendChild(errorMessageP);
        })

    }
}

// 2. Crea nueva instancia de la clase y se le da un event listener para activar las funciones the "addListeners"

const signup = new SignUp();

window.addEventListener("load", signup.addListeners);