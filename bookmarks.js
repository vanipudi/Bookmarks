
var myselect = document.getElementById('selectfolder');
var folderslist=new Array();
var get = document.getElementById("url");
get.focus();

function storeBookmarks()
{ 
  if (typeof(Storage) != "undefined")
  { 
    var get_bookmark = JSON.parse(localStorage.getItem('bookmarks')) || [];// add to it'
	var get_url = document.getElementById("url").value;
	var get_name = document.getElementById("name").value;
	var get_folder = document.getElementById("selectfolder").value;
	var y={URL:get_url,NAME:get_name,FOLDER:get_folder};
	var count=0;
	for(var i=0;i<get_bookmark.length;i++)
	 {
		if((get_bookmark[i].URL==y.URL)&&(get_bookmark[i].NAME==y.NAME))
			break;
		count++;		
	 }				
	if(count==get_bookmark.length)
	 get_bookmark.push(y);
    // then put it back.
    localStorage.setItem('bookmarks', JSON.stringify(get_bookmark));
  }  
  else
  {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  }
}

function storefolder()
{ 
  if (typeof(Storage) != "undefined")
  { 
    var list = JSON.parse(localStorage.getItem('folders')) || [];
    // add to it'
	var folder = document.getElementById("foldername").value;
	var count=0;
	for(var i=0;i<list.length;i++)
	 {
		if(list[i]==folder)
			break;
		count++;		
	 }				
	
    if(count==list.length)
		list.push(folder);
	
	  // then put it back.
    localStorage.setItem('folders', JSON.stringify(list));
    folderslist  = list;//replacing div with string
  }
	
}

function deletefolder()
{
  folderslist = JSON.parse(localStorage.getItem('folders')) || [];
  var text = document.getElementById("foldername").value;
  console.log(text);
  for(var i=0;i<folderslist.length;i++)
  {
  	if(folderslist[i]==text)
    {
		folderslist.splice(i,1);
    }

  }
  localStorage.setItem('folders', JSON.stringify(folderslist));
  fillFolders(); 

}

function retriveBookmarks()
{
  folderslist = JSON.parse(localStorage.getItem('folders')) || [];
  var x = JSON.parse(localStorage.getItem("bookmarks")) || [];//set value in p
  var y = '<ul>';
  for(var i=0;i<folderslist.length;i++)
   {
     y=y+'<li>'+folderslist[i]+'</li><ul>';
     for(var j=0;j<x.length;j++)
      {  
	   if(folderslist[i]==x[j].FOLDER)
        y=y+ '<li><a href="'+x[j].URL+'">'+x[j].URL+'</a>'+'&nbsp'+x[j].NAME+'</li>';
      }
	  y=y+'</ul>';
   }	
   y=y+'</ul>';
   //console.log(y);
  document.getElementById('result').innerHTML = y;//replacing div with string
}

function retriveFolders()
{
  folderslist = JSON.parse(localStorage.getItem('folders')) || [];
  fillFolders();
}

function fillFolders()
{
  myselect.options.length = 0;	
  for (var i=0; i < folderslist.length; i++)
  {
    var currentText = folderslist[i];
    var objOption = document.createElement("option");
    objOption.text = currentText ;
    objOption.value = currentText ;
    //myselect.add(objOption);
    myselect.options.add(objOption);
  }
}

function createOption()
{
	storefolder();
    fillFolders();
}

function cleardata()
{
 document.getElementById("url").value='';
 document.getElementById("name").value='';
 document.getElementById("selectfolder").value='';
 document.getElementById("foldername").value='';
}

addfolder = document.getElementById("addfolder");
addfolder.addEventListener('click',createOption, false);

savebtn = document.getElementById("savebtn");
savebtn.addEventListener('click', function () {storeBookmarks();retriveBookmarks();}, false);

delfolder = document.getElementById("deletefolder");
delfolder.addEventListener('click',deletefolder, false);

folderbtn = document.getElementById("managefolder");
folderbtn.addEventListener('click', function () {
if(document.getElementById('foldersdiv').style.display == "none")
	document.getElementById('foldersdiv').style.display = "block";
else
	document.getElementById('foldersdiv').style.display = "none";
}, false);

clearbtn = document.getElementById("clear");
clearbtn.addEventListener('click',cleardata, false);

retriveFolders();//it executes first and shows us the retrived values
retriveBookmarks();
