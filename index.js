//select the form --form-validate
// select the input text type field
//addEvenet listener on form's submit event and do the validation after event.preventdefault

const formMain = document.querySelector('#form-validate');
const inputName = document.querySelector('#form-validate-name');
const inputDesc = document.querySelector('#form-validate-desc');
const inputAsnTo = document.querySelector('#form-validate-assignto');
const inputDD = document.querySelector('#form-validate-dt');
const inputStat = document.querySelector('#form-validate-status')

formMain.addEventListener('submit', (event) => {
    event.preventDefault();

    if (inputName.value.length > 7) {
        inputName.classList.add('is-valid');
        inputName.classList.remove('is-invalid');
    }
    else {
        inputName.classList.add('is-invalid');
        inputName.classList.remove('is-valid');
    }
    //Check Description
    if (inputDesc.value.length > 20 && inputDesc.value.length < 250) {
        inputDesc.classList.add('is-valid');
        inputDesc.classList.remove('is-invalid');
    }
    else {
        inputDesc.classList.add('is-invalid');
        inputDesc.classList.remove('is-valid');
    }
    //check assignto
    if (inputAsnTo.value.length > 7) {
        inputAsnTo.classList.add('is-valid');
        inputAsnTo.classList.remove('is-invalid');
    }
    else {
        inputAsnTo.classList.add('is-invalid');
        inputAsnTo.classList.remove('is-valid');
    }
    //date
    if (new Date(inputDD.value) > new Date()) {
        inputDD.classList.add('is-valid');
        inputDD.classList.remove('is-invalid');
    }
    else {
        inputDD.classList.add('is-invalid');
        inputDD.classList.remove('is-valid');
    }
    //status
    console.log("inputStat.value" + inputStat.value);
    if (inputStat.value !== "") {
        inputStat.classList.add('is-valid');
        inputStat.classList.remove('is-invalid');
    }
    else {
        inputStat.classList.add('is-invalid');
        inputStat.classList.remove('is-valid');
    }



});

//let elementsTBC=document.querySelectorAll('.checkBlank');
// for (let i =0; i<elementTBC.length;i++)
// {
// elementsTBC.addEventListener
// }
//go through each elements. input value and do the not empty check and length check. and display proper message.
//but do specific check for the date field.. 
