<?php 
error_reporting(0);
error_reporting(-1);
error_reporting(E_ALL); //show all errors

//except notices
error_reporting(E_ALL & ~E_NOTICE);

//this will override php.ini config 'display_errors = on'
ini_set('display_errors','off');
echo test;
echo $test;

myfunc(); //fatal error : program stops the script here (undefined function myfunc() )...

echo 'hi there' // Parse error: syntax error because of ';': 
                  //prog doesn't know how to start a new line, hello doesn't show up.

                  
include 'test.php'; ///Warning: include(): Failed opening : hello will appear

//we could also use trigger errors:
if (true) {
    trigger_error('this a fatal error <flag : E_USER_ERROR>', E_USER_ERROR); //prog stops here.   
}
trigger_error('this is a notice<flag : E_USER_NOTICE>', E_USER_NOTICE); //prog continues.   

trigger_error('this is a warning <flag : E_USER_WARNING>', E_USER_WARNING); //prog continues.   
echo "<br>hello";




////////////////////////////////////////////
//debugging functions
////////////////////////////////////////


$foo = 'bar';
echo $foo;

$foo = [1,2,3,4];
echo $foo; //give Notice and show 'Array'
print_r ($foo);//Array ( [0] => 1 [1] => 2 [2] => 3 [3] => 4 )
var_dump($foo); //array(4) { [0]=> int(1) [1]=> int(2) [2]=> int(3) [3]=> int(4) }


////////////////////////////////////////////////////////////////////////////
class clsT {
    private $name;

    function __contruct ($name){
        $this->name= $name;
    }
} 
$c1 = new clsT('kejeiri');

$values = [1,true, 'foo', [1,2,3], null,$c1];
foreach ($values as $value) {
    echo '<br>';
    var_dump($value);
   
        // int(1) 
        // bool(true) 
        // string(3) "foo" 
        // array(3) { [0]=> int(1) [1]=> int(2) [2]=> int(3) } 
        // NULL 
        // object(clsT)#1 (1) { ["name":"clsT":private]=> NULL } 
    
}
var_dump($values); //array(6) { [0]=> int(1) [1]=> bool(true) [2]=> string(3) "foo" [3]=> array(3) { [0]=> int(1) [1]=> int(2) [2]=> int(3) } [4]=> NULL [5]=> object(clsT)#1 (1) { ["name":"clsT":private]=> NULL } }


//////////////////////////////////////////////////////////////////
//use console.log through JS.
function  console_log($val) 
{
echo '<script>';
echo 'console.log('.json_encode($val).')';
echo '</script>';
}

////////////////////////////////////

class clsT {
    private $name;

    function __contruct ($name){
        $this->name= $name;
    }
} 
$c1 = new clsT('kejeiri');

$foo = [1,true, 'foo', [1,2,3], null,$c1];
console_log($foo);



////////////////////////////////////////////
// //backtrace func

function a($txt)
{
    b('brad');
}


function b($txt)
{
    c('John');
}


function c($txt)
{
    var_dump(debug_backtrace());
}

a('tom');
//output: var_dump(debug_backtrace())
    //array(3) { [0]=> array(4) { ["file"]=> string(30) "/var/www/html/errors/index.php" 
    //["line"]=> int(98) ["function"]=> string(1) "c" ["args"]=> array(1) { [0]=> string(4) "John" } } 
    //[1]=> array(4) { ["file"]=> string(30) "/var/www/html/errors/index.php" ["line"]=> int(92) ["function"]=> string(1) 
    //"b" ["args"]=> array(1) { [0]=> string(4) "" } } [2]=> array(4) { ["file"]=> string(30) "/var/www/html/errors/index.php" 
    //["line"]=> int(107) ["function"]=> string(1) "a" ["args"]=> array(1) { [0]=> string(3) "tom" } } }


    //exceptions are like any others languages!
    function numCheck($number){
		if($number < 5){
			throw new Exception('Number must be above 5...');
		}
		return true;
	}

	try{
		numCheck(3);
		echo 'Your number is above 5';
	}

	catch(Exception $e){
		echo 'ERROR: '.$e->getFile().'(Line '.$e->getLine().'): '. $e->getMessage();
	}


    echo 'Hello World';
     

    //php info
    phpinfo();
    phpinfo(INFO_GENERAL);
    phpinfo(INFO_CONFIGURATION);
    phpinfo(INFO_MODULES);
    phpinfo(INFO_VARIABLES);
    phpinfo(INFO_ALL);
?>