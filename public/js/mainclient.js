const numberInput = document.getElementById('number');
const textInput = document.getElementById('msg');
const button = document.getElementById('button');
const response = document.querySelector('.response');   //  Query selector works like jquery (response is a class)

button.addEventListener('click', send, false);

function send() {
    const number = numberInput.value.replace(/\D/g, '');    //  Ignore non numeric characters
    const text = textInput.value;

    fetch('/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ number: number, text: text })
    })
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.log(error);
    });
}