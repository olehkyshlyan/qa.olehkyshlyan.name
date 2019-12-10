<?
namespace BlockingUser
{
session_start();

include_once "../db/db.php";
use DB as DBNS;

class BlockUser
{
	private static $authuser = NULL;
	private static $userAdmin = NULL;
	private static $outputInfo = NULL;
	private static $userID = NULL;
	private static $selectionQuery = NULL;
	private static $selectedRow = NULL;
	private static $dbUpdating = NULL;
	
	private static function checkAuthorization(){
		if(isset($_SESSION['authuser'])){
			if($_SESSION['authuser'] == true){
				self::$authuser = true;
			}
		}
		
		if(self::$authuser == true){
			if(isset($_SESSION['utype'])){
				if($_SESSION['utype'] == 'admin'){
					self::$userAdmin = true;
				}
			}
		}
	}
	
	private static function checkUserID(){
		if(isset($_POST['uid'])){
			if($_POST['uid'] != 'undefined'){
				$cutUID = substr((string)$_POST['uid'],0,50);
				unset($_POST['uid']);
				$filteredUID = preg_replace('/[^a-z0-9\_\-\=\&\.]/i','',$cutUID);
				if($filteredUID != ''){
					self::$userID = $filteredUID;
				}
				else{
					self::$outputInfo .= "User ID is empty";
				}
			}
			else{
				self::$outputInfo .= "User ID is undefined";
			}
		}
		else{
			self::$outputInfo .= "User ID is not set";
		}
	}
	
	private static function selectFromDatabase(){
		if(self::$userID != NULL){
			try{
				self::$selectionQuery = DBNS\Database::$dbHandler->query("SELECT uid,blocked FROM users WHERE uid='".self::$userID."' AND utype != 'admin';");
				self::$selectedRow = self::$selectionQuery->fetch(\PDO::FETCH_ASSOC);
				if(self::$selectedRow == false){
					self::$outputInfo .= "User was not found";
				}
			}
			catch(Exception $e){
				self::$outputInfo .= $e->getMessage();
			}
		}
	}
	
	private static function updateDatabase(){
		if(self::$selectedRow != NULL){
			if(self::$selectedRow != false){
				if(self::$selectedRow['blocked'] == 'no'){
					try{
						self::$dbUpdating = DBNS\Database::$dbHandler->exec("UPDATE users SET blocked='yes' WHERE uid='".self::$userID."';");
						if(self::$dbUpdating == 1){
							self::$outputInfo .= "User has been blocked";
						}
						else{
							self::$outputInfo .= "Updating 'blocked' cell failed";
						}
					}
					catch(Exception $e){
						self::$outputInfo .= $e->getMessage();
					}
				}
				else{
					self::$outputInfo .= "This user is already blocked";
				}
			}
		}
	}
	
	private static function outputInformation(){
		print(self::$outputInfo);
	}
	
	final public static function constructImitation(){
		self::checkAuthorization();
		self::checkUserID();
		self::selectFromDatabase();
		self::updateDatabase();
		self::outputInformation();
	}
}

BlockUser::constructImitation();

}

?>