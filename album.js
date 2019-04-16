var archive = new DatArchive(window.location);
var albumToRender = localStorage.getItem('clickedAlbum');
const defaultCaption = 'Click here to add caption to this image';
document.querySelector("#share-txt").value = window.location;

//Displaying image in card with a captionElement
var displayImageswithCaption = async function()	{
	const imagePath = `/posts/images`; //It is a path where all the images are stores.
	try {
		//await archive.stat(albumPath); //check if that album exist
		await archive.stat('config.json');

		var info = await archive.getInfo();

		var albumStr = await archive.readFile('/config.json');
		//console.log(albumStr);
		var albumConfig = JSON.parse(albumStr);
		console.log(`/posts/albums/${albumConfig.name}.json`);
		var albumStr = await archive.readFile(`/posts/albums/${albumConfig.name}.json`);
		var album = JSON.parse(albumStr);
		//console.log(album);
		//var dir = await archive.readdir(imagePath); //read images from subdirectory of post directory
		var flag = true;
		var cardCol = document.querySelector('div[class="card-columns"]'); //Fetches the card-columns div into card-col variable

		for(let i=0;i<album.images.length;i++)	{        //to fetching the images in a album folder

			const imgSrc = `${imagePath}/${album.images[i][0]}`;  //get a images in imagePath into imgSrc

			//////////////////////////////////////////////
			//creating an element div for card
			var card =document.createElement('div');
			//Setting an attribute to card
			card.setAttribute('class','card');
			card.setAttribute('id',`card-${i}`);
			//card.addEventListener('click',editCaption);

		  //creating a card-Header
			var cardHeader =document.createElement('div');
			cardHeader.setAttribute('class','card-header');

			var cardFooter =document.createElement('div');

			if( info.isOwner )	{
				var deleteBtn = document.createElement('button');
				deleteBtn.setAttribute('type','button');
				deleteBtn.setAttribute('id',`delbtn-${i}`);
				deleteBtn.setAttribute('class','btn btn-outline-danger btn-sm');

				var deleteicon = document.createElement('i')//document.createElement('span');
				//deleteicon.setAttribute('class','glyphicon glyphicon-trash');
				//deleteicon.setAttribute('src',imgSrc);
				//deleteicon.setAttribute('id',`cardD-${i}`);
				deleteicon.setAttribute('class','fa fa-trash');
				deleteicon.setAttribute('aria-hidden','true');
				deleteicon.setAttribute('id',`delico-${i}`);
				deleteicon.addEventListener('click',deleteImage);
				deleteBtn.appendChild(deleteicon);
				deleteBtn.addEventListener('click',deleteImage);

				cardFooter.setAttribute('data-toggle','modal');
				cardFooter.setAttribute('data-target','#myModal');
				cardFooter.addEventListener('click',editCaption);

				cardFooter.innerHTML = album.images[i][1] === ""?defaultCaption:album.images[i][1];
			}
			else {
				cardFooter.innerHTML = album.images[i][1] === ""?"":album.images[i][1];
				document.querySelector('#save-btn-parent').removeChild(document.querySelector('#save-button'));
			}

			var cardBody =document.createElement('div');
			cardBody.setAttribute('class','card-body');
			var imgElement = document.createElement('img');
			imgElement.setAttribute('id',`img-${i}`);
			imgElement.setAttribute('src',imgSrc);
			imgElement.setAttribute('alt',album.images[i]);
			imgElement.setAttribute('height','100%');
			imgElement.setAttribute('width','100%');
			imgElement.setAttribute('class','responsive');

			var viewImageAnchor = document.createElement('a');
			viewImageAnchor.setAttribute('href',imgSrc);

			cardFooter.setAttribute('class','card-footer');
			cardFooter.setAttribute('id',`footer-${i}`);

			cardHeader.appendChild(deleteBtn);
			card.appendChild(cardHeader);
			viewImageAnchor.appendChild(imgElement);
			cardBody.appendChild(viewImageAnchor);
			//cardBody.appendChild(imgElement);
			card.appendChild(cardBody);

			card.appendChild(cardFooter);
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

 	if( event.toElement.localName === "div" && event.toElement.className === "card-footer" )	{
		id = event.target.attributes['id'].value;
		console.log(id);
		//console.log(cardid);
		var imgid = `img-${id.split('-')[1]}`;
		var imgSrc = document.querySelector(`#${imgid}`).src;
		document.querySelector('#img-caption').src = imgSrc;
	}
};


var addCaption = function(event){
	var cardFooter = document.querySelector(`#${id}`);
	var captionModalTextarea = document.querySelector('#caption');
	cardFooter.innerHTML = captionModalTextarea.value;
	captionModalTextarea.value = "";
	//document.querySelector('#caption').value="";

	enableSave();
}

document.querySelector('#saveid').addEventListener("click",addCaption);


//displayImages();
//displayImageswithCaption();

var enableSave = function(){document.querySelector('#save-button').disabled = false;};
var disableSave = function(){document.querySelector('#save-button').disabled = true;};

var save = async function()	{
	var configStr = await archive.readFile('/config.json');
	var config = JSON.parse(configStr);

	var path = `/posts/albums/${config.name}.json`;
	var albumStr = await archive.readFile(path);
	var album = JSON.parse(albumStr);

	var images = [];

	for(let i=0;i<album.images.length;i++)	{
		var img = document.querySelector(`#img-${i}`);
		if( img !== null )	{
			var imgSrc = img.src;
			var footer = document.querySelector(`#footer-${i}`);

			var caption = footer.innerHTML.toLowerCase() === defaultCaption.toLowerCase() ? "" : footer.innerHTML;
			var imgName = imgSrc.split('/');
			images.push([imgName[imgName.length-1],caption]);
		}
	}

	var albumObj = 	{
		"name": config.name,
		"url": album.url,
		"images": images,
		"createdAt": album.createdAt
	};

	var newAlbumStr = JSON.stringify(albumObj);
	await archive.unlink(path);
	await archive.writeFile(path,newAlbumStr);
	disableSave();
};

document.querySelector('#save-button').addEventListener('click',save);

var deleteImage =async function(e){
	//e.preventDefault();
	//e.stopPropagation();
	var cardCol = document.querySelector('div[class="card-columns"]');
	//console.log(e.target);
	if( ( e.toElement.localName === "i" & e.toElement.className === "fa fa-trash" ) || ( e.toElement.localName === "button" & e.toElement.className === "btn btn-outline-danger btn-sm" ) )	{
		var Id = event.target.attributes['id'].value;//to accessing event attribute
		id = Id;
		console.log(Id);
//console.log(cardid);
		var cardToDelete = document.querySelector(`#card-${Id.split('-')[1]}`);
	//var cardCol = document.querySelector(`#${cardid}`);

//cardPath.removeChild(cardid);
		//enableSave();
		var file = document.querySelector(`#img-${Id.split('-')[1]}`).src;
		file = file.split('/');
		var fileToDelete = file[file.length-1];
		console.log(`/posts/images/${fileToDelete}`);
		await archive.unlink(`/posts/images/${fileToDelete}`);
		cardCol.removeChild(cardToDelete);
		save();
	}
};

var checkAlbum = async function()	{
	var imageList = await archive.readdir('/posts/images/');
	//console.log(imageList);
	var albumName = await archive.readdir('/posts/albums/');
	var configStr = await archive.readFile('/config.json');
	var config = JSON.parse(configStr);
	//console.log(config);
	var albumStr = await archive.readFile(`/posts/albums/${config.name}.json`);
	var album = JSON.parse(albumStr);

	Array.prototype.diff = function(a) {
    		return this.filter(function(i) {return a.indexOf(i) < 0;});
	};

	var newArr = [];
	for(let i=0;i<album.images.length;i++)	{
		newArr.push(album.images[i][0]);
	}

	var diff = imageList.diff(newArr);
	console.log(diff);
	var newImages = [];
	if( diff.length !== 0 ){
		for(let i=0;i<diff.length;i++)	{
			album.images.push([diff[i],""]);
		}

		//console.log(album.images);
		updateAlbum(album,album.images);
	}
	else {
		displayImageswithCaption();
	}

	//console.log(newImages);
};

var updateAlbum = async function(album,newImageList)	{
	var newAlbum = {
		"name": album.name,
		"url": album.url,
		"images": newImageList,
		"createdAt": album.createdAt
	};
	/*
	for(let i=0;i<newImageList.length;i++)	{
		album.images.push([newImageList[i],""]);
	}*/

	var albumStr = JSON.stringify(newAlbum);
	await archive.unlink(`/posts/albums/${album.name}.json`);
	console.log(`/posts/albums/${album.name}`);
	await archive.writeFile(`/posts/albums/${album.name}.json`,albumStr);
	displayImageswithCaption();
}

checkAlbum();

function writeToClipboard (str) {
  var textarea = document.createElement('txtarea');//yo`<textarea>${str}</textarea>`;
  textarea.value = str;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}
/*
var shareThisAlbum = function()	{
	(function() {

	    'use strict';

	  // click events
	  document.body.addEventListener('click', copy, true);

	    // event handler
	    function copy(e) {

	    // find target element
	    var
	      t = e.target,
	      c = t.dataset.copytarget,
	      inp = (c ? document.querySelector(c) : null);

	    // is element selectable?
	    if (inp && inp.select) {

	      // select text
	      inp.select();

	      try {
	        // copy text
	        document.execCommand('copy');
	        inp.blur();

	        // copied animation
	        t.classList.add('copied');
	        setTimeout(function() { t.classList.remove('copied'); }, 1500);
	      }
	      catch (err) {
	        alert('please press Ctrl/Cmd+C to copy');
	      }
	    }
	    }

	})();
}*/

var shareThisAlbum = function()	{
	var txtBox = document.querySelector("#share-txt");
	txtBox.style = "";
	txtBox.select();
	document.execCommand("copy");
	txtBox.style = "visibility:hidden";
	alert("URL copied to clipboard!");
}

document.querySelector("#share-btn").addEventListener('click',shareThisAlbum);
