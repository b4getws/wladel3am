<?php
	include './php/functions.class.php';
	class rank extends functions {
		
		var $url;
		var $pagerank;
		var $alexa_rank;
		var $backlinks = array('google' => '', 'yahoo' => '', 'msn' => '', 'altavista' => '', 'alltheweb' => '');
		var $dmoz;
		
		#start
		function rank ($url) {
			$this->url = $url;
			$this->url = preg_replace('/http\:\/\//si', '', $this->url);
			$this->pagerank = $this->__pagerank();
			$this->alexa_rank = $this->__alexa_rank();
			$this->backlinks['google'] = $this->__backlinks('google');
			$this->backlinks['yahoo'] = $this->__backlinks('yahoo');
			$this->backlinks['msn'] = $this->__backlinks('msn');
			$this->backlinks['altavista'] = $this->__backlinks('altavista');
			$this->backlinks['alltheweb'] = $this->__backlinks('alltheweb');
		}
		
		#pagerank
		function __pagerank () {
			$url = 'info:' . urldecode($this->url);
			$checksum = $this->checksum($this->strord($url));
			$url = 'http://www.google.com/search?client=navclient-auto&ch=6' . $checksum . '&features=Rank&q=' . $url;
			$v = file_get_contents($url);
			preg_match('/Rank_([0-9]+):([0-9]+):([0-9]+)/si', $v, $r);
			return ($r[3]) ? $r[3] : '0';
		}
		
		#alexa_rank
		function __alexa_rank () {
			$url = 'http://data.alexa.com/data?cli=10&dat=snbamz&url=' . urlencode($this->url);
			$v = file_get_contents($url);
			preg_match('/\<popularity url\="(.*?)" TEXT\="([0-9]+)"\/\>/si', $v, $r);
			return ($r[2]) ? $r[2] : '0';
		}
		
		#backlinks
		function __backlinks ($engine) {
			switch ($engine) {
				#google
				case 'google':
					$url = 'http://www.google.com/search?q=link%3A' . urlencode($this->url);
					$v = file_get_contents($url);
					preg_match('/of about \<b\>([0-9\,]+)\<\/b\>/si', $v, $r);
					return ($r[1]) ? str_replace(',', '', $r[1]) : '0';
				break;
				#yahoo
				case 'yahoo':
					$url = 'http://search.yahoo.com/search?p=links%3A' . urlencode($this->url);
					$v = file_get_contents($url);
					preg_match('/of about ([0-9\,]+)/si', $v, $r);
					return ($r[1]) ? str_replace(',', '', $r[1]) : '0';
				break;
				#msn
				case 'msn':
					$url = 'http://search.msn.com/results.aspx?q=link%3A' . urlencode($this->url);
					$v = file_get_contents($url);
					preg_match('/of ([0-9\,]+) results/si', $v, $r);
					return ($r[1]) ? str_replace(',', '', $r[1]) : '0';
				break;
				#altavista
				case 'altavista':
					$url = 'http://www.altavista.com/web/results?q=link%3A' . urlencode($this->url);
					$v = file_get_contents($url);
					preg_match('/found ([0-9\,]+) results/si', $v, $r);
					return ($r[1]) ? str_replace(',', '', $r[1]) : '0';
				break;
				#alltheweb
				case 'alltheweb':
					$url = 'http://www.alltheweb.com/search?q=link%3A' . urlencode($this->url);
					$v = file_get_contents($url);
					preg_match('/\<span class\="ofSoMany"\>([0-9\,]+)\<\/span\>/si', $v, $r);
					return ($r[1]) ? str_replace(',', '', $r[1]) : '0';
				break;
			}
		}
	}
?>