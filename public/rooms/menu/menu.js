let roomsArray;
let rooms_count = 0;
let canvas_room_str = "Canvas Room ";

$("#view-btn").on("click",function(){
	var listItems = $(":checkbox");
	listItems.each(function(index){
		if($(this).is(':checked')){
			let name = $(this).attr('id');
			let parsedName = name.substring(3);
			checkedList.push(parsedName);
			console.log(checkedList);	
		}
		
	});
	
	$("#includedContent").load("/rooms/multiView/multiView.html");
	
	
	
	
	
	
});

socket.on('roomData', function(data) {
	roomsArray = data;
	rooms_count = roomsArray.length;
	console.log(roomsArray.length);
	var i;
	for(i = 0; i < roomsArray.length; i++){
		let element = $('<li>');
		let element_add = $('#btn-add-li');
		let myButton = document.createElement('button');
		rooms_count = i + 1;
		let button_id = canvas_room_str + rooms_count;
		let button_class = '';
		if(rooms_count%5===0){
			button_class = "\"btn btn-secondary\"";
		}
		else if(rooms_count%5===1){
			button_class = "\"btn btn-primary\"";
		}
		else if(rooms_count%5===2){
			button_class = "\"btn btn-success\"";
		}
		else if(rooms_count%5===3){
			button_class = "\"btn btn-warning\"";
		}
		else{
			button_class = "\"btn btn-danger\"";
		}
		//console.log(button_class);
		myButton = "<input id=\"chk" + button_id+ "\" type=\"checkBox\"><button id =\"join" + button_id + "\" type=\"button\" class="+ button_class +">" + button_id + "</button>";
		element.append(myButton);
		element.insertBefore(element_add);
		document.getElementById('join'+button_id).addEventListener('click', function(){
			$("#includedContent").load("/rooms/canvases/canvas.html");
			console.log("text" + $(this).text());
			setIntent($(this).text());
			
			
		});
	}
});
//not used?
function gotoroom(room){
	let room_str = room;
	$('#btn4').on('click', function(){
		$("#includedContent").load("/rooms/canvases/canvas.html");
		setIntent($('#btn4').text());
	})
}
$('#btn-add').on('click', function(){
	rooms_count++;//increment rooms count
	console.log(canvas_room_str + rooms_count);
	let element = $('<li>');
	let element_add = $('#btn-add-li');
	let myButton = document.createElement('button');
	let button_id = canvas_room_str + rooms_count;
	let button_class = '';
	if(rooms_count%5===0){
		button_class = "\"btn btn-secondary\"";
	}
	else if(rooms_count%5===1){
		button_class = "\"btn btn-primary\"";
	}
	else if(rooms_count%5===2){
		button_class = "\"btn btn-success\"";
	}
	else if(rooms_count%5===3){
		button_class = "\"btn btn-warning\"";
	}
	else{
		button_class = "\"btn btn-danger\"";
	}
	//console.log(button_class);
	//console.log(button_class);
	myButton = "<input id=\"chk" + button_id+ "\" type=\"checkBox\"><button id =\"join" + button_id + "\" type=\"button\" class="+ button_class +">" + button_id + "</button>";
	element.append(myButton);
	element.insertBefore(element_add);
	document.getElementById('join'+button_id).addEventListener('click', function(){
		$("#includedContent").load("/rooms/canvases/canvas.html");
		console.log("text" + $(this).text());
		setIntent($(this).text());
		
		
	});
	socket.emit('makeRoom', {
		'name': canvas_room_str + rooms_count,
		'path': 'stock_apple.png'
	})
})