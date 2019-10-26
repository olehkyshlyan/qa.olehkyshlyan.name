<?
namespace IndexPageElements
{

// no reason to use static property or method
// just for learning purposes

class MiddleBlockMainButtons
{
	public static $sectionFirstPart = NULL;
	public static $sectionSecondPart = NULL;
	public static $categoriesButton = NULL;
	public static $askAQuestionButton = NULL;
	
	public static function createWrapperSection(){
		self::$sectionFirstPart = '<div id="middleBlockMainButtons">';
		self::$sectionSecondPart = '</div>';
	}
	
	public static function createCategoriesButton(){
		self::$categoriesButton = '<div id="wrCategoriesButton">';
		self::$categoriesButton .= '<span id="categoriesButton">Categories</span>';
		self::$categoriesButton .= '</div>';
	}
	
	public static function createAskAQuestionButton(){
		self::$askAQuestionButton = '<div id="wrMBAskWord">';
		self::$askAQuestionButton .= '<span id="mbAskWord">Ask a question !</span>';
		self::$askAQuestionButton .= '</div>';
	}
	
	public static function constructImitation(){
		self::createWrapperSection();
		self::createCategoriesButton();
		self::createAskAQuestionButton();
	}
	
}

MiddleBlockMainButtons::constructImitation();

}
?>