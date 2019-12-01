<?
// block the user, who is the author of the question or the answer
session_start();

if(isset($_SESSION['euser']) && $_SESSION['euser'] == true){
if(isset($_SESSION['utype']) && $_SESSION['utype'] == 'admin'){

if(isset($_POST['uid'])){
  if($_POST['uid'] != 'undefined'){
    $un = substr((string)$_POST['uid'],0,50);
    unset($_POST['uid']);
    $un = preg_replace('/[^a-z0-9\_\-\=\&\.]/i','',$un);
    if($un != ''){
      $uid = $un;
      //print('$uid: '.$uid.'<br />');
    }
    else{
      print("User id is empty");
    }
  }
  else{
    print("User id is undefined");
  }
}
else{
  print("User id is not set");
}

if(isset($uid)){

try
{
include "db.php";

$row = $db->query("SELECT uid,blocked FROM users WHERE uid = '$uid' AND utype != 'admin';")->fetch(PDO::FETCH_ASSOC);
//print('$row: '); var_dump($row); print('<br />');

if($row != false){

if($row['blocked'] == 'no'){
$upd = $db->exec("UPDATE users SET blocked='yes' WHERE uid='$uid';");
//print('$upd: '); var_dump($upd); print('<br />');
if($upd == 1){
  print('User has been blocked<br />');
}
else{
  print("Updating 'blocked' failed<br />");
}
}
else{
print('This user is already blocked<br />');
}

}
else{
  print('User was not found<br />');
}

}
catch(Exception $e){
  print($e->getMessage());
}

}

}
}

?>