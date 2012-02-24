var relatedTitles = new Array();
var relatedTitlesNum = 0;
var relatedUrls = new Array();
var thumburl = new Array();
function related_results_labels_thumbs(json) {
for (var i = 0; i < json.feed.entry.length; i++) {
var entry = json.feed.entry[i];
relatedTitles[relatedTitlesNum] = entry.title.$t;
try 
{thumburl[relatedTitlesNum]=entry.media$thumbnail.url;}


catch (error){

s=entry.content.$t;a=s.indexOf("<img");b=s.indexOf("src=\"",a);c=s.indexOf("\"",b+5);d=s.substr(b+5,c-b-5);
if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!=""))
{thumburl[relatedTitlesNum]=d;} else {if(typeof(defaultnoimage) !== 'undefined') thumburl[relatedTitlesNum]=defaultnoimage; else thumburl[relatedTitlesNum]="https://wladel3am.googlecode.com/svn/trunk/Template%20Filmyegy/Images%20sharing/noimage.png";}

}

if(relatedTitles[relatedTitlesNum].length>35) relatedTitles[relatedTitlesNum]=relatedTitles[relatedTitlesNum].substring(0, 35)+"...";
for (var k = 0; k < entry.link.length; k++) {
if (entry.link[k].rel == 'alternate') {
relatedUrls[relatedTitlesNum] = entry.link[k].href;
relatedTitlesNum++;


}
}
}
}
function removeRelatedDuplicates_thumbs() {
var tmp = new Array(0);
var tmp2 = new Array(0);
var tmp3 = new Array(0);
for(var i = 0; i < relatedUrls.length; i++) {
if(!contains_thumbs(tmp, relatedUrls[i])) 
{
tmp.length += 1;
tmp[tmp.length - 1] = relatedUrls[i];
tmp2.length += 1;
tmp3.length += 1;
tmp2[tmp2.length - 1] = relatedTitles[i];
tmp3[tmp3.length - 1] = thumburl[i];
}
}
relatedTitles = tmp2;
relatedUrls = tmp;
thumburl=tmp3;


}

function contains_thumbs(a, e) {
for(var j = 0; j < a.length; j++) if (a[j]==e) return true;
return false;
}


function printRelatedLabels_thumbs(current) {
var splitbarcolor;
if(typeof(splittercolor) !== 'undefined') splitbarcolor=splittercolor; else splitbarcolor="#d4eaf2";
for(var i = 0; i < relatedUrls.length; i++)
{
if((relatedUrls[i]==current)||(!relatedTitles[i]))
{
relatedUrls.splice(i,1);
relatedTitles.splice(i,1);
thumburl.splice(i,1);
i--;
}
}


var r = Math.floor((relatedTitles.length - 1) * Math.random());
var i = 0;

if(relatedTitles.length>0) document.write('<h2>'+relatedpoststitle+'</h2>');
document.write('<div style="clear: both;"/>');
while (i < relatedTitles.length && i < 15 && i<maxresults) {
document.write('<a style="text-decoration:none;padding:4px;width:112px;height:155px;float:left;');
if(i!=0) document.write(''+splitbarcolor+';"');
else document.write('"');
document.write(' href="' + relatedUrls[r] + '"><img style="width:96px;height:110px;border: 1px solid #5781FF;padding: 3px;background: #ddd;margin-left:4px;" src="'+thumburl[r]+'"/><br/><div style="width:100px;padding-left:5px;height:20px; font-style: normal; font-variant: normal; font-weight: normal; font-size: 11px; line-height: normal; font-size-adjust: none; font-stretch: normal;text-align: center;">'+relatedTitles[r]+'</div></a>');

i++;


if (r < relatedTitles.length - 1) {
r++;
} else {
r = 0;
}

}
document.write('</div>');

relatedUrls.splice(0,relatedUrls.length);
thumburl.splice(0,thumburl.length);
relatedTitles.splice(0,relatedTitles.length);

}