function createGallery(images) {
	var divRow = document.createElement('div')
	setAttributes(divRow, ['class'], ['row'])
	for (var i = 0; i < images.length; i++) {
		var divColumn = document.createElement('div')
		createColumn(divColumn, images[i])
		divRow.appendChild(divColumn)
	}
	document.getElementById('main').appendChild(divRow)
}

function createColumn(column, srcImage) {
	setAttributes(column, ['class'], ['column'])
	var img = document.createElement('img')
	setAttributes(img, ['src', 'width', 'class'], [srcImage, '100%', 'hover-shadow'])
	addListener(img, 'click', openModelByEvent)
	column.appendChild(img)
}

function getImage(image, width) {
	var img = document.createElement('img')
	setAttributes(img, ['src', 'width'], [image, '100%'])
	return img
}

function createModal(image, width){
	var divModel = document.createElement('div')
	setAttributes(divModel, ['id', 'class'], ['myModal', 'modal'])
	var divModelContent = document.createElement('div')
	setAttributes(divModelContent, ['class'], ['modal-content'])
	var divSlide = document.createElement('div')
	setAttributes(divSlide, ['class'], ['mySlides'])
	var img = getImage(image, width)
	divSlide.appendChild(img)
	divModelContent.appendChild(divSlide)
	divModel.appendChild(divModelContent)
	document.getElementById('main').appendChild(divModel)
}

function setAttributes(tag, attrs, values){
	for (var i = 0; i < attrs.length; i++)
		tag.setAttribute(attrs[i], values[i])
}

function addListener (element, eventName, handler){
	if (element.attachEvent)
		return element.attachEvent(eventName, handler);
	else
		return element.addEventListener(eventName, handler);
}

function openModelByEvent() {
	pointerPosition = findPointerPosition(this.src)
	openModelByImage(pointerPosition)
}

function openModelByImage(pos) {
	var myModal = document.getElementById('myModal')
	if (myModal != null)
		document.getElementById('main').removeChild(myModal) 
	createModal(images[pos], '100%')
	saveSlide(pos)
	document.getElementById('myModal').style.display = "block";
}

function keyEventHandler(event) {
	event.preventDefault();
	if (event.keyCode == 27) {
		document.getElementById('myModal').style.display = "none";
		removeSlide()
	}
	if (event.keyCode == 37 && isActiveModel()) {
		pointerPosition = (pointerPosition - 1 < 0) ? 0 : pointerPosition - 1
		openModelByImage(pointerPosition)
	}
	if (event.keyCode == 39 && isActiveModel()) {
		pointerPosition = (pointerPosition + 1 > images.length - 1) ? images.length - 1 : pointerPosition + 1
		openModelByImage(pointerPosition)
	}
	if (event.keyCode == 112) {
		alert("This is a gallery.\nIf you want to suggest improving for this gallery\ncontact to me(go to CONTACTS)")
	}
}

function isActiveModel() {
	var myModal = document.getElementById('myModal')
	return myModal != null && myModal.style.display != 'none'
}

function findPointerPosition(image) {
	for (var i = 0; i < images.length; i++) {
		if (image.endsWith(images[i]))
			return i
	}
}

function saveSlide(pos) {
	document.cookie = `position=${pos}`
}

function removeSlide() {
	document.cookie = 'position='
}

function isModelOpen() {
	if (document.cookie == '')
		return false	
	var cookies = document.cookie.split('=')
	if (cookies[1] == '')
		return false
	return true
}

function getCurrentSlidePosition() {
	var cookies = document.cookie.split('=')
	return cookies[1]	
}


var images = ["gallery_images/beach.jpg", "gallery_images/lake.jpg", "gallery_images/mountain.jpg", "gallery_images/tree.png"]
var pointerPosition = 0
addListener(document, 'keydown', keyEventHandler)
if (!isModelOpen())
	createGallery(images)
else {
	openModelByImage(getCurrentSlidePosition())
	createGallery(images)
}
