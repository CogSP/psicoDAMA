<html>
    <head>
        
    </head>
<?php
    
    echo "<h1> You are now registered!</h1>";
    $password = $_POST["password"];
    $email = $_POST["email"];
    $username = $_POST["username"];
    $fullname = $_POST["fullname"];
    $number = $_POST["number"];
    $wins = 0;
    
    echo "Your data: username = $username, fullname = $fullname, email = $email, number = $number <br>";
    echo '<input type = "button" value = "Torna alla home" onClick = "history.go(-2); return true" name = "button">';
    $dbconnection = pg_connect("host = localhost dbname = dama user = postgres password = kub3tt0SQL") or die('Could not connect');
    //per qualche motivo mi dice che le funzioni non esistono ANCHE SE l'highlighting le consiglia e funzionano

    //Inserisco il nuovo utente nel db con zero vittorie
    $query ="INSERT INTO utente VALUES('$username', '$fullname', '$email', '$number', '$password', 0)";
    $result = pg_query($dbconnection, $query) or die('la query non va');
    pg_free_result($result);
    pg_close($dbconnection);
    //prova


?>
    
</body>
</html>