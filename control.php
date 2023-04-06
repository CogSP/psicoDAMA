<html>

    <?php
    $usr1 = $_POST["user1name"];
    $usr2 = $_POST["user2name"];
    $pwd1 = $_POST["user1pwd"];
    $pwd2 = $_POST["user2pwd"];

    $dbconnection = pg_connect("host = localhost dbname = dama user = postgres password = kub3tt0SQL") or die('Could not connect');
    $query = " 
    SELECT utente.username
    FROM utente
    WHERE (utente.password = $pwd1 and utente.username = $usr1 or
        (utente.password = $pwd2 and utente.username = $usr2 )
    ";
    $result = pg_query($dbconnection, $query) or die('la query non va');
    if($result->num_rows == 2){ //Ma ora che ci faccio?

    }
    else{

    }
    ?>

</html>