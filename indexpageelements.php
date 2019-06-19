<?

// no reason to use static property or method
// just for learning purposes

class AskAQuestionButton
{
	public static $button = NULL;
	
	public static function createButton(){
		self::$button = '<div id="wrMBAskWord">';
		self::$button .= '<span id="mbAskWord">Ask a question !</span>';
		self::$button .= '</div>';
	}
	
}

AskAQuestionButton::createButton();

?>