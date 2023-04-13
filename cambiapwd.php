<!DOCTYPE html>

<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8">
    <title> Cambio di password </title>
    <link rel="stylesheet" href="profile.css">
    <link rel="stylesheet" href="background.css">
    <script src="profile.js" defer></script>
    <script src="cambiapwd.js" defer></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
   </head>
<div class="bg"></div>
<div class="bg bg2"></div>
<div class="bg bg3"></div>
<body>

<div class="hero">
 
  <nav> 
      <ul>
          <li><a href="index.php">Home</a></li>
          <li><a href="game.php">Fight!</a></li>
          <li><a href="profile.php">Profile</a></li>
          <li><a href="rules.php">Rules</a></li>
          <li><a href="settings.php">Settings</a></li>
          <li><a href="ranking.php">Ranking</a></li>
      </ul>
  </nav>

</div>

<div  class = "the_form">


  <div class="container">
    <div class="title">Inserisci i dati</div>
    <div class="content">
      <form id = "form" action="" method="">
        <div class="user-details">
          <div class="input-box">
            <span class="details">Username</span>
            <input id = "username" name = "username" type="text" placeholder="Enter your username" required>
          </div>          
          <div class="input-box">
            <span class="details"> Vecchia Password</span>
            <input id = "pwd" name = "password"type="password" placeholder="Enter your old password" required>
            <input type="button" onclick="showPwd()" value="Mostra/nascondi password">
          </div>
          <div class="input-box">
            <span class="details"> Nuova Password</span>
            <input id = "cpwd" name = "password"type="password" placeholder="Enter a new password" required>
            <input type="button" onclick="showCpwd()" value="Mostra/nascondi password">
          </div>
        </div>
        <div class="button">
          <input type="submit" value="Effettua cambio">
        </div>
      </form>
    </div>
  </div>

</div>

</body>
</html>