<?php
	error_reporting(E_ALL ^ E_NOTICE);
	header('Content-Type: text/plain');
	if (trim($_GET['url']) && trim($_GET['url']) != 'http://') {
		include 'https://wladel3am.googlecode.com/svn/trunk/pagerank/php/rank.class.php';
		$url = get_magic_quotes_gpc() ? urldecode(stripslashes($_GET['url'])) : urldecode($_GET['url']);
		$rank = new rank($url);
		$s = array('$url', '$pagerank', '$alexa_rank', '$backlinks', '$msn', '$yahoo');
		$backlinks = ceil(($rank->backlinks['google'] + $rank->backlinks['yahoo'] + $rank->backlinks['msn'] + $rank->backlinks['altavista'] + $rank->backlinks['alltheweb']) / 5);
		$r = array($rank->url, $rank->pagerank, $rank->format_number($rank->alexa_rank), $rank->format_number($backlinks), $rank->format_number($rank->backlinks['msn']), $rank->format_number($rank->backlinks['yahoo']));
		echo str_replace($s, $r, file_get_contents('template.html'));
	} else {
		echo 'Enter a valid URL';
	}
?>