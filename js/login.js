const userKalle = "Kalle";
const pwdKalle = "qwe123";

const userLoggedIn = localStorage.getItem("user");

// Refererar till inputen "user" i html-koden
let user;

// Refererar till inputen "pwd" i html-koden
let pwd;

// Refererar till p-taggen utanför formuläret där, senare, infomeddelanden skriv ut i
let info;

// Refererar till p-taggen inuti formuläret där, senare, infomeddelande skrivs ut i 
let infoForm;

// Refererar till formuläret där html-taggarna med id "user", "pwd" och "btn-log-in" ligger i
let form;

// Refererar till knappen med id "btn-log-out" i html-koden
let logOut;

// Refererar de globala variablerna till rätt html-taggar
// Lyssnar efter om någon av knapparna trycks och isåfall aktivera functionerna inuti måsvingarna.
// Om man klickar på logga ut knappen så döljs den dessutom så att den inte syns i utloggat läge
// Kontrollerar också om det finns tidigare Namn lagrade i localstorage och isåfall startar funktionen logInFunction
function init(){
    user = document.getElementById("user");
    pwd = document.getElementById("pwd");
    info = document.getElementById("info-log-in");
    infoForm = document.getElementById("info-log-in-form");

    const formLogIn = document.getElementById("inloggning-form");
    form = formLogIn;
    formLogIn.addEventListener("submit", e=>{
        e.preventDefault();
        logInCheck();
    })

    if(userLoggedIn === userKalle){
        user.value = userLoggedIn;

        logInFunction();
    }
}

// Aktiverar funktionen init
window.onload = init;

// Kontrollerar så att inloggningsuppgifterna stämmer
// Finns de registrerade så aktiveras funktionen LogInFunction
// Finns de inte registrerade så skickas en sträng till p-taggen för meddelande med texten "Felaktiga inloggningsuppgifter"
function logInCheck(){
    if(user.value === userKalle){
        if(pwd.value === pwdKalle){            
            return logInFunction();
        }
        else{
            infoForm.textContent = `Felaktiga inloggningsuppgifter`;

            return;
        }
    }
    else{
        infoForm.textContent = `Felaktiga inloggningsuppgifter`;

        return;
    }
}

function logInFunction(){
    localStorage.setItem("user", user.value);

    window.location.href = "index.html";

    return;
}