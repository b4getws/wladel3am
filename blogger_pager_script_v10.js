/********************************
Blogger Pager Script v1.0
(C) 2008 by Anhvo, http://vietwebguide.com
Visit http://en.vietwebguide.com to get more cool hacks
********************************/

var pager_max_results = 20;
if(location.href.match("max-results=")){
	pager_max_results = parseInt(location.href.substring(location.href.indexOf("max-results=")+12).split("\&")[0]);
} else if(!location.href.match("/search/label/")){
	pager_max_results = pager_max_main;
}


var per_page = pager_max_results ;
if(!location.href.match('/search/label/')) { 
	pager_feedx = "http://www.blogger.com/feeds/"+blogID+"/posts/summary"; 
	pager_pageurl = home_page+"search";
	}
else {
	label = location.href.split("/")[5];
	label = label.split("?")[0];
	label = label.replace(/ /g,"%20");
	pager_feedx = "http://www.blogger.com/feeds/"+blogID+"/posts/summary/-/"+label;
	pager_pageurl = home_page+"search/label/"+label;
}

function createBlogPager(){
	var script = document.createElement('script');
	script.src = pager_feedx+"?start-index=1&max-results=0&alt=json-in-script&callback=countnumpost";
	script.type = "text/javascript";
	document.getElementsByTagName('head')[0].appendChild(script)
}

function countnumpost(json) {
	var posts  = json.feed.openSearch$totalResults.$t;
	var num_pages = (posts%per_page == 0) ? posts/per_page : Math.floor(posts/per_page)+1;
	var buoc2 = Math.round(num_pages/pager_num_of_button);
	createPagesList(buoc2,num_pages);
}

function page(d){ 
	returnDate(d); 
}


function getDateAndGo(json){
	var date2 = json.feed.entry[0].published.$t;
	ss = parseFloat(date2.substring(17,19));
	if(ss<59) ss++;
	if(ss<10) { ss = "0"+ ss; }
	date4  = encodeURIComponent(date2.substring(0,17)+ss+date2.substring(23,date2.length));
	location.href = pager_pageurl+'?updated-max='+date4+'&max-results=' + per_page ;
}

function returnDate(startindex) { 
	var i = per_page*(startindex-1)+1;
	var script2 = document.createElement("script"); 
	script2.src =  pager_feedx+"?start-index="+i+"&max-results=1&alt=json-in-script&callback=getDateAndGo"; 
	document.getElementsByTagName('head')[0].appendChild(script2)
}


function createPagesList(buoc,num_pages){
	var isDOM  = (navigator.appName.match("Microsoft Internet Explorer") || navigator.appName.match("MSIE")) ? false : true;
	if(buoc==0) buoc = 1;
	for(var i=1;i<num_pages+1;i = i+buoc)
	{
     	var a = document.createElement("a");
		a.className = "blogpaging";
		a.id = "ddmp"+i;
		a.title = pager_link_alt_text+" "+i;
		a.href = "javascript:page(" + i + ")";
		
		if(buoc!=1) {
			r = num_pages % buoc;
			last = (r!=0) ? num_pages - r +1 : num_pages - buoc + 1;
			a.innerHTML = (i==last) ? i: i +', ';
		} else { 
			a.innerHTML = (i==num_pages) ? i: i +', ';
		}
		
		var div = document.createElement("div");
		div.id = "ddmc"+i;
		div.style.visibility = "hidden";
		if(i!=num_pages){
			div2 = document.createElement("div");
			var t = '';
			for(var j=i+1;j<i+buoc;j++){
				t += '<div class="blogpaging"><a title="'+pager_link_alt_text+' '+j+'" href="javascript:page('+j+')">'+j+'</a></div>';
				if(j==num_pages) break;
			}
			div2.innerHTML = t;
			if(isDOM) div.appendChild(div2);
		}
				
		var sc2 = document.createElement("script");
		text = 'at_attach("ddmp'+i+'", "ddmc'+i+'", "hover", "y", "pointer");';
		
		if(isDOM){
			tt = document.createTextNode(text);
			sc2.appendChild(tt);
		} else {
			sc2.text = text;
		}
		
		var pages = document.getElementById('blogpager');
		pages.appendChild(a);
		pages.appendChild(div);
		pages.appendChild(sc2);
		
	}
}

//==== display total posts and pages

function pager_showTotal(){
	var script = document.createElement('script');
	script.src = pager_feedx+"?start-index=1&max-results=0&alt=json-in-script&callback=pagerJsonShowTotal";
	script.type = "text/javascript";
	document.getElementsByTagName('head')[0].appendChild(script);
}

function pagerJsonShowTotal(json) {
	var posts  = json.feed.openSearch$totalResults.$t;
	var num_pages = (posts%per_page == 0) ? posts/per_page : Math.floor(posts/per_page)+1;
	var totalDis = document.getElementById('blogpagerShowToTal');
	totalDis.innerHTML = pager_total_text+ posts + pager_posts_text + num_pages + pager_pages_text;
}

// ddmenu
function at_display(x) { 
	var win = window.open(); 
	for (var i in x) win.document.write(i+' = '+x[i]+'<br>');
} 
function at_show_aux(parent, child) {
	var p = document.getElementById(parent); 
	var c = document.getElementById(child ); 
	var top  = (c["at_position"] == "y") ? p.offsetHeight+2 : 0; 
	var left = (c["at_position"] == "x") ? p.offsetWidth +2 : 0; 
	for (; p; p = p.offsetParent) { 
		top  += p.offsetTop; left += p.offsetLeft; 
	} 
	c.style.position   = "absolute"; 
	c.style.top = top +'px'; c.style.left = left+'px'; c.style.visibility = "visible"; 
} 
function at_show(){ 
	var p = document.getElementById(this["at_parent"]); 
	var c = document.getElementById(this["at_child" ]);  
	at_show_aux(p.id, c.id); clearTimeout(c["at_timeout"]); 
} 
function at_hide(){ 
	var c = document.getElementById(this["at_child"]); 
	c["at_timeout"] = setTimeout("document.getElementById('"+c.id+"').style.visibility = 'hidden'", 333);
}; 
function at_click(){
	var p = document.getElementById(this["at_parent"]); 
	var c = document.getElementById(this["at_child" ]); 
	if (c.style.visibility != "visible") at_show_aux(p.id, c.id); 
	else c.style.visibility = "hidden"; 
	return false;
}  
function at_attach(parent, child, showtype, position, cursor) { 
	var p = document.getElementById(parent); 
	var c = document.getElementById(child);  
	p["at_parent"]  = p.id; 
	c["at_parent"] = p.id;
	p["at_child"] = c.id; 
	c["at_child"] = c.id; 
	p["at_position"]   = position; 
	c["at_position"] = position; 
	c.style.position   = "absolute"; 
	c.style.visibility = "hidden"; 
	if (cursor != undefined) p.style.cursor = cursor; 
	switch (showtype) { 
		case "click":  p.onclick  = at_click; 
			p.onmouseout  = at_hide; 
			c.onmouseover = at_show; 
			c.onmouseout  = at_hide; 
			break; 
		case "hover": p.onmouseover = at_show; 
			p.onmouseout  = at_hide; 
			c.onmouseover = at_show; c.onmouseout  = at_hide; break; 
	}
}
