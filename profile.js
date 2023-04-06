

function showPwd() {
  var input = document.getElementById('pwd');
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

function showCpwd() {
  var input = document.getElementById('cpwd');
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

// function estraiDati(){
//   let usr1 = document.getElementsByName("user1name").textContent;
//   let usr2 = document.getElementsByName("user2name").textContent;
//   let pwd1 = document.getElementsByName("user1pwd").textContent;
//   let pwd2 = document.getElementsByName("user2pwd").textContent;

//   const pg = require('pg');


// const config = { //hardcoded e soggette a SQLinjection, ma va bene così
//     host: 'localhost',
//     user: 'postgres',     
//     password: 'kub3tt0SQL',
//     database: 'dama',
//     port: 5432,
//     ssl: true
// };

// const client = new pg.Client(config);

// client.connect(err => {
//     if (err) throw err;
//     else {
//         console.log("Connesso!!!");
//         queryDatabase();
//     }
// });


// function queryDatabase() {
//     const query = `
//         SELECT utente.username
//         FROM utente
//         WHERE (utente.password = ${pwd1} and utente.username = ${usr1} or
//                 (utente.password = ${pwd2} and utente.username = ${usr2} )
//     `;

//     client.query(query)
//         .then(function(results){
//           //qui devo fare qualcosa con il risultato della query
//           console.log("Risultato query:" + results + "Lunghezza:" + results.length);
//           if(results.length == 2) console.log("funziona");
//           else console.log("Non funzione")

//         }
//         )
//         .catch(err => {
//             console.log(err);
//         });
// }
  
// }