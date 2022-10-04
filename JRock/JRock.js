//JRock part starts here
/*
1. Document will be load by event listener
2. onDocumentLoaded will run(on Startup me start hote samay jo functions chalwane hai wo sab daldege)
3. Init framework will run
4. Now to accordian will run

*/

function $$$(cid){
let element=document.getElementById(cid);
if(!element) throw "Invalid id : "+cid;
return new JRockElement(element);
}
$$$.model={
//as there can be multiple accordians in a  page
"onStartup":[],//sare function ka address isme aayga jo chlwana hai multiple accordians
"accordians":[],//sare accordians ka address
"modals":[]
};
//modal specific code starts here
$$$.modals={};

$$$.modals.show=function(mid)
{
var modal=null;
for(var i=0;i<$$$.model.modals.length;i++)
{ 
if($$$.model.modals[i].getContentId()==mid) 
{
modal=$$$.model.modals[i];
break;
}
}
if(modal==null) return;
modal.show();
}

 
//following is a class
function Modal(cref)
{
var objectAddress=this;
//some property that can be used to decide if the modal
//should be closed if the user clicks outside the modal
//area
this.beforeOpening=null;
this.afterOpening=null;
this.beforeClosing=null;
this.afterClosing=null;
var contentReference=cref;

this.getContentId=function(){
return contentReference.id;
}
var contentParentReference=contentReference.parentElement;
var contentIndex=0;
while(contentIndex<contentParentReference.children.length)
{
if(contentReference==contentParentReference.children[contentIndex])
{
break;    
}
contentIndex++;
}
var modalMaskDivision=document.createElement("div");
modalMaskDivision.style.display='none';
modalMaskDivision.classList.add("jrock_modalMask");
var modalDivision=document.createElement("div");
modalDivision.style.display='none';
modalDivision.classList.add("jrock_modal");
document.body.appendChild(modalMaskDivision);
document.body.appendChild(modalDivision);
var headerDivision=document.createElement('div');
headerDivision.style.marginRight="0px";
headerDivision.style.height="40px";
headerDivision.style.padding="5px";
modalDivision.appendChild(headerDivision);


if(contentReference.hasAttribute("size"))
{
var sz=contentReference.getAttribute("size");
var xpos=sz.indexOf("x");
if(xpos==-1) xpos=indexOf("X");
if(xpos==-1) throw "In case of modal size should be specified as widthxheight";
if(xpos==0 || xpos==sz.length-1)  throw "In case of modal size should be specified as widthxheight";
let width=sz.substring(0,xpos);
let height=sz.substring(xpos+1);
modalDivision.style.width=width+"px";
modalDivision.style.height=height+"px";
//parse and set the width and height of the modal division
}
else{
modalDivision.style.width="300px";
modalDivision.style.height="300px";
}

if(contentReference.hasAttribute("header"))
{
var hd=contentReference.getAttribute("header");
headerDivision.innerHTML=hd;
}


if(contentReference.hasAttribute("maskColor"))
{
var mkc=contentReference.getAttribute("maskColor");
modalMaskDivision.style.background=mkc;
}

if(contentReference.hasAttribute("modalBackgroundColor"))
{
var mbc=contentReference.getAttribute("modalBackgroundColor");
modalDivision.style.background=mbc;
}


var contentDivision=document.createElement("div");
contentDivision.style.height=(modalDivision.style.height.substring(0,modalDivision.style.height.length-2)-130)+"px";
contentDivision.style.width="98%";
contentDivision.style.overflow="auto";
contentDivision.style.padding="5px";
contentReference.remove();

contentDivision.appendChild(contentReference);
contentReference.style.display='block';
contentReference.style.visibility='visible';
modalDivision.appendChild(contentDivision);


var footerDivision=document.createElement("div");
footerDivision.style.left="0";
footerDivision.style.right="0";
footerDivision.style.height="40px";
footerDivision.style.position="absolute";
footerDivision.style.bottom="0";
footerDivision.style.padding="5px";
modalDivision.appendChild(footerDivision);

if(contentReference.hasAttribute("footer"))
{
var ft=contentReference.getAttribute("footer");
footerDivision.innerHTML=ft;
}


var closeButtonSpan=null;
if(contentReference.hasAttribute("closeButton"))
{
var cb=contentReference.getAttribute("closeButton");
if(cb.toUpperCase()=="TRUE")
{
closeButtonSpan=document.createElement("span");
closeButtonSpan.classList.add("jrock_closeButton");
var closeButtonMarker=document.createTextNode("x");
closeButtonSpan.appendChild(closeButtonMarker);
headerDivision.appendChild(closeButtonSpan);
}
}

if(contentReference.hasAttribute("beforeOpening"))
{
var oo=contentReference.getAttribute("beforeOpening");
this.beforeOpening=oo;
//eval(oo);
}

if(contentReference.hasAttribute("afterOpening"))
{
var oo=contentReference.getAttribute("afterOpening");
this.afterOpening=oo;
//eval(oo);
}

if(contentReference.hasAttribute("beforeClosing"))
{
var oc=contentReference.getAttribute("beforeClosing");
this.beforeClosing=oc;
//eval(oc);
}

if(contentReference.hasAttribute("afterClosing"))
{
var oc=contentReference.getAttribute("afterClosing");
this.afterClosing=oc;
//eval(oc);
}

this.show=function(){
let openModal=true;
if(this.beforeOpening)
{
openModal=eval(objectAddress.beforeOpening);
}
if(openModal)
{
modalMaskDivision.style.display='block';
modalDivision.style.display='block';
if(this.afterOpening) setTimeout(function(){eval(objectAddress.afterOpening);},100);
}
};
if(closeButtonSpan!=null)
{
closeButtonSpan.onclick=function(){
let closeModal=true;
if(objectAddress.beforeClosing)
{
closeModal=eval(objectAddress.beforeClosing);
}
if(closeModal)
{
modalMaskDivision.style.display='none';
modalDivision.style.display='none';
if(objectAddress.afterClosing) setTimeout(function(){eval(objectAddress.afterClosing);},100);
}
}
}
}






//modal specific code ends here

//expanded index is like a flag as we need to collapse other division if a division is clicked so in start its value is -1 so no need to collapse now its value will increase(will keep on DIV's as it contains display) now if its not -1 than we need to collapse by setting its style.display as none and than incrementing its value 

$$$.accordianHeadingClicked=function(accordianIndex,panelIndex)
{
if($$$.model.accordians[accordianIndex].expandedIndex!=-1) $$$.model.accordians[accordianIndex].panels[$$$.model.accordians[accordianIndex].expandedIndex].style.display='none';
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.display=$$$.model.accordians[accordianIndex].panels[panelIndex+1].oldDisplay;
$$$.model.accordians[accordianIndex].expandedIndex=panelIndex+1;
}

$$$.toAccordian=function(accord)
{
var panels=[]; 
var expandedIndex=-1;
let children=accord.childNodes;
let x;
for(x=0;x<children.length;x++)
{
if(children[x].nodeName=="H3")
{
//add to panels
panels[panels.length]=children[x];
}
if(children[x].nodeName=="DIV")
{
//add to panels
panels[panels.length]=children[x];
}
}
if(panels.length%2!=0) throw "Headings and division malform to create accordian";
for(x=0;x<panels.length;x+=2)
{
if(panels[x].nodeName!="H3") throw "Headings and division malform to create accordian";
if(panels[x+1].nodeName!="DIV") throw "Headings and division malform to create accordian";
}
function createClickHandler(accordianIndex,panelIndex)
{
//jab click karege tab ye fn chlega
return function(){
$$$.accordianHeadingClicked(accordianIndex,panelIndex);
};
}

let accordianIndex=$$$.model.accordians.length;
for(x=0;x<panels.length;x+=2)
{
// ye line se clickHandler chalega or clickHandler jis function ka address return karega wo on click ko assign hoga or wo function tab chlega jab xth heading pr click kia jaye
panels[x].onclick=createClickHandler(accordianIndex,x);
panels[x+1].oldDisplay=panels[x+1].style.display;//panels[x+1].oldDisplay me jo hamara actual display hai wo lelia (custom tag-oldDisplay)
panels[x+1].style.display="none";//start me display none rhega of divisions 
}

$$$.model.accordians[accordianIndex]={
"panels":panels,
"expandedIndex":-1
};

}//toAccordian ends here

$$$.onDocumentLoaded=function(func){
if((typeof func)!="function") throw "Expected function,found"+(typeof func)+" is call to onDocumentLoaded";
$$$.model.onStartup[$$$.model.onStartup.length]=func;
}

$$$.initFramework=function(){
let allTags=document.getElementsByTagName("*");
let t=null;
let i=0;
let a=null;
for(i=0;i<allTags.length;i++)
{
t=allTags[i];
if(t.hasAttribute("accordian"))
{
a=t.getAttribute("accordian");
if(a=="true")
{
$$$.toAccordian(t);
}
}
}
let x=0;
while(x<$$$.model.onStartup.length)
{
$$$.model.onStartup[x]();
x++;
}
//setting up modal part starts here
var all=document.getElementsByTagName("*");
for(i=0;i<all.length;i++)
{
if(all[i].hasAttribute("forModal"))
{
if(all[i].getAttribute("forModal").toUpperCase()=="TRUE")
{
all[i].setAttribute("forModal","false");
$$$.model.modals[$$$.model.modals.length]=new Modal(all[i]);
i--;//has baar ek modal ka obj kam hoga
}
}
}
//setting up modal part ends here

}//end of init frameword

function JRockElement(element)
{
this.element=element;
this.html=function(content)
{
if(typeof this.element.innerHTML=="string")
{
if((typeof content)=="string")
{
this.element.innerHTML=content;
}
return this.element.innerHTML;
}
return null;
}//html function ends

this.value=function(content)
{
if(typeof this.element.value)
{
if((typeof content)=="string")
{
this.element.value=content;
}
return this.element.value;
}
return null;
}//value function ends here

this.fillComboBox=function(jsonObject)
{
if(this.element.nodeName!="SELECT") throw "fillComboBox can be called on a SELECT type object only";

//validate if dataSource,text and value properties exist
//if dataSource exist them there should be a collection against it
//if text property exists,it should be of string type
//if value property exists,it should be of string type
//if text property exists and if it is of string type then that should be part of dataSource element
//if value property exists and if it is of string type then that should be part of dataSource element
//if first option is specified then it should have 2 properties of string type text and value,check for that
//clear all existing option from SELECT
//if first option exists,create option tag and append it to SELECT
//traverse the dataSource array and on every cycle create Option tag and append it to SELECT

}//fillComboBox ends
}//class JRockElement ends

$$$.ajax=function(jsonObject)//$$$ is a pointer and ajax is a function $$$ points to a function named ajax
{
if(!jsonObject["url"]) throw "url property is missing in call to ajax";
let url=jsonObject["url"];//let a type for declaring variables
if((typeof url)!="string") throw "url property should be of string type in call to ajax";
let methodType="GET";//default method type
if(jsonObject["methodType"])
{
methodType=jsonObject["methodType"];
if((typeof methodType)!="string") throw "methodType property should be of string type in call to ajax";
methodType=methodType.toUpperCase();
if(["GET","POST"].includes(methodType)==false) throw "methodType should be GET/POST in call to ajax";
}

let onSuccess=null;
if(jsonObject["success"])
{
onSuccess=jsonObject["success"];
if((typeof onSuccess)!="function") throw "success property should be a function in call to ajax";
}

let onFailure=null;
if(jsonObject["failure"])
{
onFailure=jsonObject["failure"];
if((typeof onFailure)!="function") throw "failure property should be a function in call to ajax";
} 
if(methodType=="GET")
{
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)
{
if(this.status==200)
{
var responseData=this.responseText;
if(onSuccess) onSuccess(responseData);
}
else
{
if(onFailure) onFailure();
}
}
};
 		
if(jsonObject["data"])
{
let jsonData=jsonObject["data"];
let queryString="";
let qsName;
let qsValue;
let xx=0;
for(k in jsonData)
{
if(xx==0) queryString+="?";
if(xx>0) queryString+="&";
xx++;
qsName=encodeURI(k);
qsValue=encodeURI(jsonData[k]);
queryString=queryString+qsName+"="+qsValue;
}
url+=queryString;
}
xmlHttpRequest.open(methodType,url,true);
xmlHttpRequest.send();
} //get part ends here


if(methodType=="POST")
{

var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)
{
if(this.status==200)
{
var responseData=this.responseText;
if(onSuccess) onSuccess(responseData);
}
else
{
if(onFailure) onFailure();
}
}
};
let jsonData={};
let sendJSON=jsonObject["sendJSON"];
if(!sendJSON) sendJSON=false;
if((typeof sendJSON)!="boolean") throw "sendJSON property should be of boolean type in ajax call";
let queryString="";
if(jsonObject["data"])
{

if(sendJSON)
{
jsonData=jsonObject["data"];
}
else
{
queryString="";
let qsName;
let qsValue;
let xx=0;
for(k in jsonData)
{
//if(xx==0) queryString+="?";
if(xx>0) queryString+="&";
xx++;
qsName=encodeURI(k);
qsValue=encodeURI(jsonData[k]);
queryString=queryString+qsName+"="+qsValue;
}
}
}
xmlHttpRequest.open(methodType,url,true);//true matlab ye request asynchronous rhegi mtlb parallel me or tasks hote rhege
if(sendJSON)
{
xmlHttpRequest.setRequestHeader("Content-Type","application/json");//ye sirf post type request me likhna hai
xmlHttpRequest.send(JSON.stringify(jsonData));
}
else
{
//what will be written over here to set request header
xmlHttpRequest.send(queryString);
}
}
}
/*$$$.onDocumentLoaded(function(){
$$$.toAccordian("mymy");
$$$.toAccordian("gogo");
});*/

window.addEventListener('load',function(){
$$$.initFramework();
});

//JRock ends here
