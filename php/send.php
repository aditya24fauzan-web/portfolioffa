<?php

if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])){

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

$to = "fadzillahfauzanaditya4@gmail.com";   // ganti dengan email kamu
$subject = "Pesan dari Portfolio Website";

$body = "Name: $name\n";
$body .= "Email: $email\n\n";
$body .= "Message:\n$message";

$headers = "From: $email";

mail($to,$subject,$body,$headers);

echo "Message sent successfully!";

}

?>