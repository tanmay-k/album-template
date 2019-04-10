var archive = new DatArchive(window.location);
var albumToRender = localStorage.getItem('clickedAlbum');

/*var displayImages = async function()	{
	const albumPath = albumToRender.endsWith('.json')?`/posts/albums/${albumToRender}`:`/posts/albums/${albumToRender}.json`;
	const imagePath = `/posts/images`;
	try {
		await archive.stat(albumPath);//check if that album exist

		var albumStr = await archive.readFile(albumPath);//read a file albumPath which is existed and make a archive of it
		var album = JSON.parse(albumStr);//Parse the albumStr into jsin file
		var dir = await archive.readdir(imagePath);//read images as subdirectory of post directory
		var flag = true;
		for(let i=0;i<album.images.length;i++)	{
			//const imgSrc = `${imagePath}/${album.images[i]}`;
			const imgSrc = `${imagePath}/${album.images[i][0]}`;

			/////////////////////////////////////////////
			//var row = document.createElement('div');
			//row.setAttribute('class','row');

			//var col1 = document.createElement('div');
			//col1.setAttribute('class','col')

			//var col2 = document.createElement('div');
			//col2.setAttribute('class','col');

			//////////////////////////////////////////////
			var imgElement = document.createElement('img');
			imgElement.setAttribute('src',imgSrc);
			imgElement.setAttribute('alt',album.images[i]);
			imgElement.setAttribute('height','100%');
			imgElement.setAttribute('width','100%');
			//imgElement.setAttribute('class',flag?'img-fluid img-thumbnail float-left mt-3 mb-3':'img-fluid img-thumbnail float-right mt-3 mb-3');
			imgElement.setAttribute('class','responsive');
			//col1.appendChild(imgElement);
			//row.appendChild(col1);
			//flag?col1.appendChild(imgElement):col2.appendChild(imgElement);
			//flag?row.appendChild(col1):row.appendChild(col2);
			//flag = flag?false:true;
			document.querySelector('div[class="col"]').appendChild(imgElement);
		}

	} catch (e) {
		console.log(e);
	} finally {

	}
}*/
//Displaying image in card with a captionElement
var displayImageswithCaption = async function()	{
	//TODO: read album.json and fetch images from that album and render them here
	//Create template for album, put this code there. That will be useful for sharing albums.
//To Get Album name we check whether the file ends with ".json" as extension or not if not the render the album ele get file with .json extension
	//const albumPath = albumToRender.endsWith('.json')?`/posts/albums/${albumToRender}`:`/posts/albums/${albumToRender}.json`;

	//const imagePath = `/posts/images`; //It is a path where all the images are stores.
	try {
		await archive.stat(albumPath); //check if that album exist

		var albumStr = await archive.readFile(albumPath); //read a file albumPath which is existed and make a archive of it
		var album = JSON.parse(albumStr); //Parse the albumStr into json object
		var dir = await archive.readdir(imagePath); //read images from subdirectory of post directory
		var flag = true;
		//var content =document.createElement('div'); //create an Element div of content field

		var cardCol=document.querySelector('div[class="card-columns"]'); //Fetches the card-columns div into card-col variable

		for(let i=0;i<album.images.length;i++)	{        //to fetching the images in a album folder

			const imgSrc = `${imagePath}/${album.images[i][0]}`;  //get a images in imagePath into imgSrc

			//////////////////////////////////////////////
			//creating an element div for card
			var card =document.createElement('div');
			//Setting an attribute to card
			card.setAttribute('class','card');
			card.setAttribute('id',`card-${i}`);
			card.addEventListener('click',editCaption);

		  //creating a card-Header
			var cardHeader =document.createElement('div');
			cardHeader.setAttribute('class','card-header');

			var deleteBtn = document.createElement('button');
			deleteBtn.setAttribute('type','button');
			deleteBtn.setAttribute('class','btn btn-outline-danger btn-sm float-right');

			var deleteicon = document.createElement('i')//document.createElement('span');
			//deleteicon.setAttribute('class','glyphicon glyphicon-trash');
			//deleteicon.setAttribute('src',imgSrc);
			//deleteicon.setAttribute('id',`cardD-${i}`);
			deleteicon.setAttribute('class','fa fa-trash');
			deleteicon.setAttribute('aria-hidden','true');
			deleteBtn.appendChild(deleteicon);
			deleteBtn.addEventListener('click',deleteImage);
		//	deleteicon.addEventListener('click',deleteImage);
			var cardBody =document.createElement('div');
			cardBody.setAttribute('class','card-body');
			var imgElement = document.createElement('img');
			imgElement.setAttribute('id',`img-${i}`);
			imgElement.setAttribute('src',imgSrc);
			imgElement.setAttribute('alt',album.images[i]);
			imgElement.setAttribute('height','100%');
			imgElement.setAttribute('width','100%');
			imgElement.setAttribute('class','responsive');

		/*	imgElement.setAttribute('onclick','openModal();currentSlide([i])');
			imgElement.setAttribute('class','hover-shadow cursor'); */
			var cardFooter =document.createElement('div');
			cardFooter.setAttribute('class','card-footer');
			cardFooter.setAttribute('data-toggle','modal');
			cardFooter.setAttribute('data-target','#myModal')
			cardFooter.setAttribute('id',`footer-${i}`);
			cardFooter.innerHTML = "Click here to add caption to this image";
			//var caption =document.createElement('p');
		//	caption.setAttribute('class','card-textarea');
			//card.setAttribute('data-toggle','modal');
			//card.setAttribute('data-target','#myModal');
			//var time =document.createElement('p');
			//time.setAttribute('class','card-text');

			cardHeader.appendChild(deleteBtn);
			card.appendChild(cardHeader);
			cardBody.appendChild(imgElement);
			card.appendChild(cardBody);
			//cardFooter.appendChild(caption);
			//cardFooter.appendChild(time);
			card.appendChild(cardFooter);
		  	//content.appendChild(card);
			//document.querySelector('div[class="container-fluid"]').appendChild(cardDeck);

			cardCol.appendChild(card);
		}


	} catch (e) {
		console.log(e);
	} finally {

	}
};

var id;
//This function just shows the preview of image while adding caption
var editCaption = async function(event){
	console.log(event.target);

 	//id = event.target.attributes['id'].value;//to accessing event attribute
 	//console.log(id);
	id = event.target.attributes['id'].value.startsWith('footer')?event.target.attributes['id'].value:false;
 	if( id )
 	{
		//console.log(cardid);
		var imgid = `img-${id.split('-')[1]}`;
		var imgSrc = document.querySelector(`#${imgid}`).src;
		document.querySelector('#img-caption').src =imgSrc;
	}
};


var addCaption = function(event){

//var cardid =	event.target.attributes['id'].value;//to accessing event attribute
/*var card = document.querySelector(`#${cardid}`);
console.log(card.hasChildNodes());
var cardFooter = card.childNodes[2];
console.log(cardFooter);
//var cap =cardFooter.childNode;
var modalCaption = document.querySelector('#caption').value;
cardFooter.innerHTML = `<p>${modalCaption}</p>`;
console.log(modalCaption);*/

/*	console.log(event.target);
	var imgElement = document.querySelector(`#img-${id.split('-')[1]}`);
	var cardBody = imgElement.parentNode;
	console.log(cardBody);
	var card = cardBody.parentNode;
	console.log(card);
	var cardFooter = card.childNodes[2];*/
	//console.log(cardFooter);
	var cardFooter = document.querySelector(`#${id}`);
	var captionModalTextarea = document.querySelector('#caption');
	cardFooter.innerHTML = captionModalTextarea.value;
	captionModalTextarea.value = "";
	//document.querySelector('#caption').value="";

	enableSave();
}

document.querySelector('#saveid').addEventListener("click",addCaption);


//displayImages();
displayImageswithCaption();


var deleteImage = function()	{

}


var enableSave = function(){document.querySelector('#save-button').disabled = false;};
var disableSave = function(){document.querySelector('#save-button').disabled = true;};


////
/*var saveCaption = async function(){


	var imgElement = document.querySelector(`#${id}`);
	var cardBody = imgElement.parentNode;
	console.log(cardBody);
	var card = cardBody.parentNode;
	console.log(card);
	var cardFooter = card.childNodes[2];
	console.log(cardFooter);
	cardFooter.innerHTML = document.querySelector('#caption').value;

	const oldAlbumPath = albumToRender.endsWith('.json')?`/posts/albums/${albumToRender}`:`/posts/albums/${albumToRender}.json`;

		 var oldAlbumP= await archive.stat(oldAlbumPath);//check if that album exist


		var newAlbum = JSON.parse(oldAlbumP);//Parse the albumStr into jsin file

		var oldAlbum = await archive.readFile(newAlbum);//read a file albumPath which is existed and make a archive of it

		var albumArray = [];  ////Creating an empty Array
		for (i = 0; i < albumArray.length; i++) {
		albumArray.push([oldAlbum.images[i][0],cardFooter]);

		//reader.onload = async function()	{
			//var targetPath = `/posts/images/${file.name}`;

			//try {
			//	await archive.stat(targetPath);
			//} catch (e) {
				//await archive.writeFile(targetPath,reader.result);
				//setTimeout(async function(){await archive.writeFile(targetPath,reader.result);},timeOut+=5000);
			//} finally {
			//}
			//appendImage(targetPath);
		//};
		//setTimeout(function(){reader.readAsArrayBuffer(file);},timeOut+=5000);
		//reader.readAsArrayBuffer(file);
}

	AlbumCaption(albumArray);//Now create album.json

}


////

	var AlbumCaption = async function(albumArray)	{
	var albumName = document.querySelector('#album-name').value;
	//var albumName = "firstAlbum";

	//var jsonFileName = getJsonFileName(8);
	var targetPath = `/posts/albums/${albumName}.json`;
	try {
		await archive.stat(targetPath);
		//Album already exist
		// TODO: Update existing album
	} catch (e) {
		//Album does not exist so create new one
		var curTime = Date.now().toString();
		var newAlbum = {
			'name': albumName,
			'images': albumArray,
			'createdAt': curTime
		}
		var newAlbumString = JSON.stringify(newAlbum);
		await archive.writeFile(targetPath,newAlbumString);

	} finally {
	}

	appendAlbum(albumName);	//Reload album list now




disableSave();
}*/

var saveCaption = async function(event){
	 var cardCapid = event.target.attributes['id'].value;
	 console.log(cardCapid);
	 	const oldAlbum = albumToRender.endsWith('.json')?`/posts/albums/${albumToRender}`:`/posts/albums/${albumToRender}.json`;
	  var albumArray =[];
	  //var imgElement = document.querySelector(`#${id}`);

		//var imgElement = document.querySelector(`#${id}`);
		//var cardBody = imgElement.parentNode;
		//console.log(cardBody);
	//	var card = cardBody.parentNode;
		//console.log(card);

	 // var cardFooter =card.childNodes[2];
	  //console.log(cardFooter);
	 // cardFooter.innerHTML =document.querySelector('#caption').value;

	var card = document.querySelectorAll('div[class="card-footer"]');

	  var albumforCap = await archive.readFile(oldAlbum);
	  var capObj = JSON.parse(albumforCap);

	  for(i=0;i<capObj.images.length;i++){
	  	if(card[i].innerHTML ===""){
	  		albumArray.push([capObj.images[i][0],""]);
	  	}
	  	else{
	  	albumArray.push([capObj.images[i][0],card[i].innerHTML])
	  }

	 }//loop End


	var targetPath = oldAlbum;

  newAlbum ={
  	'name': oldAlbum.split('/')[3],//oldAlbum,
  	'images': albumArray

  }

	console.log(newAlbum.images[0]);
	var newAlbumString = JSON.stringify(newAlbum);
	await archive.writeFile(targetPath,newAlbumString);



}


/////
document.querySelector('#save-button').addEventListener('click',saveCaption);

//For Deleting Particular Image
/*
var deleteImage = async function(e){

 //var cardCapid =	event.target.attributes['id'].value;

   e.preventDefault();
   e.stopPropagation();

   var deleteEl = e.target;

   //((d ((btn.parentNode).parentNode).removeChild(btn.parentNode);eleteEl.parentNode).parentNode).removeChild(deleteEl.parentNode);

   //var element = document.getElementById(`#${id}`);
  //element.classList.remove("card");


	//var path = cardCapid.getAttribute("src");
  var path = deleteEl.getAttribute("src");
    // remove from DOM
    var imageEl = document.querySelector(`img[src='${path}']`);
    //var imageEl =document.querySelector(`card[src='${path}']`);
    if( imageEl )
        ( imageEl.parentNode && imageEl.parentNode.remove() ) || imageEl.remove;

    // remove from archive
    await archive.unlink(path);

};*/

var deleteImage =async function(e){
	e.preventDefault();
	e.stopPropagation();
	var cardCol = document.querySelector('div[class="card-columns"]');
	console.log(e.target);
	id = event.target.attributes['id'].value;//to accessing event attribute
	console.log(id);
//console.log(cardid);
	var cardToDelete = document.querySelector(`#card-${id.split('-')[1]}`);
	//var cardCol = document.querySelector(`#${cardid}`);

//cardPath.removeChild(cardid);
	cardCol.removeChild(document.querySelector(`#${cardid}`));
}
