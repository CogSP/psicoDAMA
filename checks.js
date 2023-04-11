//Qui ci sono i check (per ora solo il controllo che la conferma è uguale
//alla password) del form di registrazione

const form = document.querySelector("form");
const password = document.getElementById("pwd");
const conferma = document.getElementById("cpwd");


conferma.addEventListener("input",(event)=>{
  if(password.value!= conferma.value){
    showError(1);
  }
  else{
    conferma.setCustomValidity(""); //forse non serve
    //tutto ok, il form viene mandato
  }
});

function showError(num){
    if(num == 1){
        conferma.setCustomValidity("passwords need to match!")
    }
    if(num == 2){
        
    }
}