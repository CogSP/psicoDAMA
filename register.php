<html>
    <head>
    <link rel="stylesheet" href="profile.css"> <!-- Uso lo stesso css di profile.php -->
    </head>
<body>
<?php
    
   
    $password = $_POST["password"];
    $email = $_POST["email"];
    $username = $_POST["username"];
    $fullname = $_POST["fullname"];
    $number = $_POST["number"];
    $wins = 0;
    
    
    $dbconnection = pg_connect("host = localhost dbname = dama user = postgres password = kub3tt0SQL") or die('Could not connect');
    //per qualche motivo mi dice che le funzioni non esistono ANCHE SE l'highlighting le consiglia e funzionano

    //Inserisco il nuovo utente nel db con zero vittorie
    $query ="INSERT INTO utente VALUES('$username', '$fullname', '$email', '$number', '$password', 0)";
    $result = pg_query($dbconnection, $query) or die('la query non va');
    pg_free_result($result);
    pg_close($dbconnection);
    echo 
    "
    <div class='container'>
    <div class='title'>$fullname, you are registered!</div>
    <div class='content'>
      <form action='index.php' method='post'>
        <div class='user-details'>
          <div class='input-box'>
            <span class='details'> Your username: $username</span>
          </div>
          <div class='input-box'>
            <span class='details'>Your email: $email</span>
          </div>
          <div class='input-box'>
            <span class='details'>Your phone number: $number</span>
          </div>
        </div>
        <div class='button'>
          <input type='submit' value='Back to home'>
        </div>
      </form>
    </div>
  </div>


    
    "
    


?>
</body>
</html>