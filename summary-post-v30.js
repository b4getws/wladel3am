﻿// <!-- Summary Posts with thumbnails for Blogger/Blogspot version 3.0 (C)2008 by Anhvo -->
// <!-- http://wlad-el3am.blogspot.com/ -->
// <!-- See the tutorial (in portuguese) to install on http://wlad-el3am.blogspot.com/ -->



function removeHtmlTag(strx,chop){ 
	if(strx.indexOf("<")!=-1)
	{
		var s = strx.split("<"); 
		for(var i=0;i<s.length;i++){ 
			if(s[i].indexOf(">")!=-1){ 
				s[i] = s[i].substring(s[i].indexOf(">")+1,s[i].length); 
			} 
		} 
		strx =  s.join(""); 
	}
	chop = (chop < strx.length-1) ? chop : strx.length-2; 
	while(strx.charAt(chop-1)!=' ' && strx.indexOf(' ',chop)!=-1) chop++; 
	strx = strx.substring(0,chop-1); 
	return strx+'...'; 
}

function createSummaryAndThumb(pID){
	var div = document.getElementById(pID);
	var imgtag = "";
	var img = div.getElementsByTagName("img");
	var summ = summary_noimg;
	if(img.length>=1) {	
		if(thumbnail_mode == "float") {
			imgtag = '<span style="float:left; padding:0px 10px 5px 0px;"><img src="'+img[0].src+'" width="'+img_thumb_width+'px" height="'+img_thumb_height+'px"/></span>';
			summ = summary_img;
		} else {
			imgtag = '<div style="padding:5px" align="center"><img style="max-width:'+img_thumb_width+'px; max-height:'+img_thumb_height+'px;" src="'+img[0].src+'" /></div>';
			summ = summary_img;
		}
	}
	
	var summary = imgtag + '<div>' + removeHtmlTag(div.innerHTML,summ) + '</div>';
	div.innerHTML = summary;
}

