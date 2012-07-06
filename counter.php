<?php

//Created by Anuj Pathania --- anujpathania#gmail.com. Please Feel Free to mail me if you want any help, script has a bug or just wanna say Hi. :D

//This code is released under GPL (General Public License).

/*
You need to create a database and table to store data first, please do so by executing this command in phpmyadmin first but make sure you change database and table name --

 CREATE TABLE `YOUR-COUNTER-DATABASE`.`YOUR-COUNTER-TABLE` (
`SN` BIGINT NOT NULL AUTO_INCREMENT ,
`name` VARCHAR( 1000 ) NOT NULL ,
`hit` BIGINT NOT NULL DEFAULT '1',
PRIMARY KEY ( `SN` )
) ENGINE = MYISAM 

*/
	Header("content-type: application/x-javascript");
	$url = getenv("HTTP_REFERER");
	$url = str_replace ("http://",'',$url);
	$url = str_replace ("www.",'',$url);
    if ($url != "")
		{
			$username = "YOUR-USERNAME"; // Enter Your Username and Password Here
			$password = 'YOUR-PASSWORD'; // Enter Your Username and Password Here
			$database = 'YOUR-COUNTER-DATABASE';  //Enter Your Database Name Here
			$table = "counter"; //Enter Your Counter Table Name Here
			
			
			$link = mysql_connect('localhost', $username, $password); 
			if (!$link) 
			{
    			die('Could not connect: ' . mysql_error());
			}
			$db_selected = mysql_select_db($database, $link); 
			if (!$db_selected) 
			{
    			die ('Cann\'t select database : ' . mysql_error());
			}
			$query = "Select hit from $table where name = '$url'"; 
			$result = mysql_query($query);
			if (!$result) 
			{
    			die('Invalid query: ' . mysql_error());
			}
			if (mysql_affected_rows()==0)
			{
				$query = "Insert into counter (name) values ('$url')";
				$result = mysql_query($query);
				echo "document.write('1');";
				if (!$result) 
				{
    				die('Invalid query: ' . mysql_error());
				}
			}
			else
			{
				$hitcount = mysql_result($result, 0);
				$hitcount++;
				echo "document.write('$hitcount');";
				$query = "Update counter set hit = $hitcount where name = '$url'";
				$result = mysql_query($query);
				if (!$result) 
				{
    				die('Invalid query: ' . mysql_error());
				}
			}
		}
		mysql_close($link);
?>