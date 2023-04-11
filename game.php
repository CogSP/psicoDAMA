

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="game.css"> 
    <!-- <link rel = "stylesheet" href = "back.css"> -->
    <script src="https://kit.fontawesome.com/cd9a86b4ff.js" crossorigin="anonymous"></script> <!-- serve per le corone-->
    <script defer src="script.js"></script>
    <script defer src ="profile.js"></script>

    <title>Let's FIGHT!</title>
</head>
<body id = "body">

  
    <!-- MODAL DIALOG-->

    <?php
    
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $usr1 = $_POST["user1name"];
        $usr2 = $_POST["user2name"];
        $pwd1 = $_POST["user1pwd"];
        $pwd2 = $_POST["user2pwd"];
    
        $dbconnection = pg_connect("host = localhost dbname = dama user = postgres password = kub3tt0SQL") or die('Could not connect');
        $query = " 
        SELECT username
        FROM utente
        WHERE (utente.password = '$pwd1' and utente.username = '$usr1') or
            (utente.password = '$pwd2' and utente.username = '$usr2' )
        ";
        $result = pg_query($dbconnection, $query) or die('la query non va');
        $array = pg_fetch_all($result);
        if(count($array) == 2){ //il pop-up non c'è più, mentre compaiono i nomi dei due giocatori in alto 
            echo " 
            <div class='desktop'>
                <div name = $usr1 id = 'wtt' class='white-turn-text' >$usr1 (WHITE)</div>
                <br>
                <p id='divider'>VS</p>
                <div name = $usr2 id = 'btt' class='black-turn-text'>$usr2 (BLACK)</div>
            </div>
            ";

        }
        else{ //In questo caso il pop-up deve rimanere, e ci vorrebbe un messaggio di errore che chiede dati corretti
            echo '
        
    <div class="modal-container show" id="modal-container-id">
        <div class="modal">
            <form action = "game.php" method="post" id = "form">  
            <div class="user-details">
              <div class="input-box">
                <span class="details">User 1 name </span>
                <input name = "user1name" type="text" placeholder="Enter first player username" required>
              </div>
              <div class="input-box">
                <span class="details">User 2 name</span>
                <input name = "user2name" type="text" placeholder="Enter second player username" required>
              </div>
              <div class="input-box">
                <span class="details">User 1 password</span>
                <input id = "pwd" name = "user1pwd" type="password" placeholder="Enter first player password" required>
                <input type="button" onclick="showPwd()" value="Mostra/nascondi password">
              </div>
              <div class="input-box">
                <span class="details">User 2 password</span>
                <input id = "cpwd" name = "user2pwd" type="password" placeholder="Enter second player password" required>
                <input  type="button" onclick="showCpwd()" value="Mostra/nascondi password">
              </div>
            </div>
            <div class="bottone">
                <button type="submit" id = "submit">Submit</button> 
            </div>
        </form>
        </div>
    </div>
        
        
        
        ';
        }
        pg_free_result($result);
        pg_close($dbconnection);
        }
    else{ //così semplicemente si torna sempre alla richiesta di login, magari si potrebbe aggiungere un alert di errore che dice di inserire dati corretti
        echo '
        
        <div class="modal-container show" id="modal-container-id">
        <div class="modal">
            <form action = "game.php" method="post" id = "form">  
            <div class="user-details">
              <div class="input-box">
                <span class="details">User 1 name </span>
                <input name = "user1name" type="text" placeholder="Enter first player username" required>
              </div>
              <div class="input-box">
                <span class="details">User 2 name</span>
                <input name = "user2name" type="text" placeholder="Enter second player username" required>
              </div>
              <div class="input-box">
                <span class="details">User 1 password</span>
                <input id = "pwd" name = "user1pwd" type="password" placeholder="Enter first player password" required>
                <input type="button" onclick="showPwd()" value="Mostra/nascondi password">
              </div>
              <div class="input-box">
                <span class="details">User 2 password</span>
                <input id = "cpwd" name = "user2pwd" type="password" placeholder="Enter second player password" required>
                <input  type="button" onclick="showCpwd()" value="Mostra/nascondi password">
              </div>
            </div>
            <div class="bottone">
                <button type="submit" id = "submit">Submit</button> 
            </div>
        </form>
        </div>
    </div>
        
        
        
        ';

    }
    
    ?>
    
    <!-- END OF MODAL DIALOG-->

    <div class = "placeholder-for-win-message" id="placeholder-for-win-message-id">
    <!-- questo diventa qualcosa effettivamente solo alla vittoria di un giocatore (vedi codice js) -->
    </div>

    <!-- <div class ="trucco">
   
    </div> -->


    <main>
    <table>  
        <tr>  <!-- Riga della table, con dentro gli elementi, ognuno una casella della damiera-->
            <td class = "white"></td> <!-- Casella  bianca, sempre vuota-->
            <td class = "black"><p class="white-piece" id = 0></p></td>  
            <td class = "white"></td>
            <td class = "black"><p class="white-piece" id = 1></p></td> 
            <td class = "white"></td> 
            <td class = "black"><p class="white-piece" id = 2></p></td> 
            <td class = "white"></td> 
            <td class = "black"><p class="white-piece" id = 3></p></td>
        </tr>
        <tr>  
            <td class = "black"><p class="white-piece" id = 4></p></td>
            <td class = "white"></td> 
            <td class = "black"><p class="white-piece" id = 5></p></td> 
            <td class = "white"></td> 
            <td class = "black"><p class="white-piece" id = 6></p></td> 
            <td class = "white"></td> 
            <td class = "black"><p class="white-piece" id = 7></p></td> 
            <td class = "white"></td>
        </tr>
        <tr>  
            <td class = "white"></td> 
            <td class = "black"><p class= "white-piece" id = 8></p></td> 
            <td class = "white"></td> 
            <td class = "black"><p class= "white-piece" id = 9></p></td> 
            <td class = "white"></td> 
            <td class = "black"><p class= "white-piece" id = 10></p></td> 
            <td class = "white"></td> <td class = "black"><p class="white-piece" id = 11></p></td>
        </tr>
        <tr>  
            <td class = "black"></td> 
            <td class = "white"></td> 
            <td class = "black"></td> 
            <td class = "white"></td> 
            <td class = "black"></td> 
            <td class = "white"></td> 
            <td class = "black"></td> 
            <td class = "white"></td>
        </tr>
        <tr>  
            <td class = "white"></td> 
            <td class = "black"></td> 
            <td class = "white"></td> 
            <td class = "black"></td> 
            <td class = "white"></td> 
            <td class = "black"></td> 
            <td class = "white"></td> 
            <td class = "black"></td>
        </tr>
        <tr> 
            <td class = "black"><p class = "black-piece" id = 12></p></td> 
            <td class = "white"></td> 
            <td class = "black"><p class = "black-piece" id = 13></p></td> 
            <td class = "white"></td> 
            <td class = "black"><p class = "black-piece" id = 14></p></td> 
            <td class = "white"></td> 
            <td class = "black"><p class = "black-piece" id = 15></p></td> 
            <td class = "white"></td>
        </tr>
        <tr>  
            <td class = "white"></td> 
            <td class = "black"><p class = "black-piece" id = 16></p></td> 
            <td class = "white"></td> 
            <td class = "black"><p class = "black-piece" id = 17></p></td> 
            <td class = "white"></td> 
            <td class = "black"><p class = "black-piece" id = 18></p></td> 
            <td class = "white"></td> 
            <td class = "black"><p class = "black-piece" id = 19></p></td>
        </tr>
        <tr>  
            <td class = "black"><p class = "black-piece" id = 20></p></td> 
            <td class = "white"></td> 
            <td class = "black"><p class = "black-piece" id = 21></p></td> 
            <td class = "white"></td> 
            <td class = "black"><p class = "black-piece" id = 22></p></td> 
            <td class = "white"></td> 
            <td class = "black"><p class = "black-piece" id = 23></p></td> 
            <td class = "white"></td>
        </tr>
    </table>
    </main>

</body>
</html>
 