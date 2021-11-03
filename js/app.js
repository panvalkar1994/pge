let algorithm = "";
let rawValue = "";
let passwordLength = 10;


async function digestMessage(message, algorithm) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hash = await crypto.subtle.digest(algorithm, data);
    return hash;
}

function setAlgorithm(value){
    algorithm = value;
    console.log(algorithm)
}

async function passwordEntered(){
    const inputBox = document.getElementById("password-raw");
    rawValue = inputBox.value;
    console.log(rawValue);
    if(algorithm==""){
        const toast = document.querySelector('.toast');
        const myToast = new bootstrap.Toast(toast);
        myToast.show();
        inputBox.value = "";
    }else{
        const arrayBuffer = await digestMessage(rawValue, algorithm);
        const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
        const encryptedValueRefEl = document.getElementById("encryptedValueRef");
        encryptedValueRefEl.value = base64String;
    }
}

function copyToClipBoard(){
    const encryptedValueRefEl = document.getElementById("encryptedValueRef");
    encryptedValueRefEl.select();
    encryptedValueRefEl.setSelectionRange(0,passwordLength,0);
    const selectedText = encryptedValueRefEl.value.slice(0,passwordLength);
    navigator.clipboard.writeText(selectedText);
}

function lengthChange(){
    const passwordLengthEl = document.getElementById("password-length");
    passwordLength = passwordLengthEl.value || 10;
}   