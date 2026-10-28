const userKalle = "Kalle";
const pwdKalle = "qwe123";

// Refererar till inputen "user" i html-koden
let user;

// Refererar till inputen "pwd" i html-koden
let pwd;

// Refererar till p-taggen inuti formuläret där, senare, infomeddelande skrivs ut i 
let infoForm;

// Refererar de globala variablerna till rätt html-taggar
// Lyssnar efter om inloggningsformuläret skickas och isåfall anropas funktionen logInCheck.
function init(){
    user = document.getElementById("user");
    pwd = document.getElementById("pwd");
    infoForm = document.getElementById("info-log-in-form");

    const formLogIn = document.getElementById("inloggning-form");
    formLogIn.addEventListener("submit", e=>{
        e.preventDefault();
        logInCheck();
    })
}

// Aktiverar funktionen init
window.onload = init;

// Kontrollerar så att inloggningsuppgifterna stämmer
// Finns de registrerade så aktiveras funktionen LogInFunction
// Finns de inte registrerade så skickas en sträng till p-taggen för meddelande med texten "Felaktiga inloggningsuppgifter"
function logInCheck(){
    if(user.value === userKalle && pwd.value === pwdKalle){          
        return logInFunction();
    }
     else{
        infoForm.textContent = `Felaktiga inloggningsuppgifter`;
        
        pwd.value = "";
        
        return;
    }
}

function logInFunction(){
    localStorage.setItem("user", user.value);

    window.location.href = "index.html";

    return;
}