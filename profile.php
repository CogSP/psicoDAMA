<!DOCTYPE html>

<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8">
    <title> Registration Form </title>
    <link rel="stylesheet" href="profile.css">
    <script src="profile.js" defer></script>
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
   </head>
<body>
  <div class="container">
    <div class="title">Registration</div>
    <div class="content">
      <form action="register.php" method="post">
        <div class="user-details">
          <div class="input-box">
            <span class="details">Full Name</span>
            <input name = "fullname" type="text" placeholder="Enter your name" required>
          </div>
          <div class="input-box">
            <span class="details">Username</span>
            <input name = "username" type="text" placeholder="Enter your username" required>
          </div>
          <div class="input-box">
            <span class="details">Email</span>
            <input name = "email" type="email" placeholder="Enter your email" required>
          </div>
          <div class="input-box">
            <span class="details">Phone Number</span>
            <!-- Non capisco perchè tel non funziona, accetta anche testi, per ora ho messo number-->
            <input name = "number" type="number" placeholder="Enter your number" required>
          </div>
          <div class="input-box">
            <span class="details">Password</span>
            <input id = "pwd" name = "password"type="password" placeholder="Enter your password" required>
            <input type="button" onclick="showPwd()" value="Mostra/nascondi password">
          </div>
          <div class="input-box">
            <span class="details">Confirm Password</span>
            <input id = "cpwd" type="password" placeholder="Confirm your password" required>
            <input type="button" onclick="showCpwd()" value="Mostra/nascondi password">
          </div>
        </div>
        <div class="button">
          <input type="submit" value="Register">
        </div>
      </form>
    </div>
  </div>

</body>
</html>