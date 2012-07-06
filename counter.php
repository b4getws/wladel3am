<?php
if(!session_id()){
session_start();
}
if($_SESSION['tracked'] == "") { // Lad st&aring; tom, hvis samme mappe
$_SESSION['tracked'] = "done";
$path = $PHP_SELF."";
$fp = fopen($path."counter.txt", "r");
$total = fread($fp, 10000) + 1;
fclose($fp);
$fp = fopen($path."counter.txt", "w");
fwrite($fp, $total);
fclose($fp);
} function output_total() {
$path = $PHP_SELF.""; // Lad st&aring; tom, hvis samme mappe
$fp = fopen($path."counter.txt", "r");
$total = fread($fp, 10000) + 1;
fclose($fp);
echo $total;
}
?> 