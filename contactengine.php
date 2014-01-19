<?php

$EmailFrom = "hello@doodlepupsfl.com";
$EmailTo = "dpatsos@cfl.rr.com";
$Subject = "Doodlepupsfl Email";
$Name = Trim(stripslashes($_POST['required_name']));
$Puppy  = Trim(stripslashes($_POST['required_puppy']));
$Tel = Trim(stripslashes($_POST['required_phone'])); 
$Email = Trim(stripslashes($_POST['required_email'])); 
$Message = Trim(stripslashes($_POST['required_message'])); 

// validation
$validationOK=true;
if (!$validationOK) {
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
  exit;
}

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $Name;
$Body .= "\n";
$Body .= "Tel: ";
$Body .= $Tel;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $Email;
$Body .= "They want: ";
$Body .= "\n";
$Body .= $Puppy;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $Message;
$Body .= "\n";

// send email 
$success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");

// redirect to success page 
if ($success){
  print "<meta http-equiv=\"refresh\" content=\"0;URL=contactthanks.php\">";
}
else{
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
}
?>