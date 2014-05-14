var textlist=null;
function inputboxes(e)
{
  e.preventDefault();
  textlist=[];
  var x=$('#arraysize').val();
  for(var i=0;i<x;i++)
  {  
    var newbox = $('<input/>').attr({ type: 'text', name:'text', value:'',id: "textid"+(i+1)}).addClass("text");
    $("#result").append(newbox);
	textlist.push(newbox);
  }
  /*console.log(textlist);*/
  return false;
 } 

 function createdivs()
 {
 var list=inputboxes();
 for(var i=0;i<=list.length;i++){
    $('<div>').appendTo('body');
 }
 }
  $('#random').on('click',createdivs);