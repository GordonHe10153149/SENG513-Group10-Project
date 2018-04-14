let rooms_count = 0;
let canvas_room_str = "Canvas Room ";
let add_button = $('#btn-add');
window.onload = loadRooms(); 

function loadRooms(){
	
	socket.emit('getUpdatedList');
	console.log("loaded")
};
socket.on('updatedListOfRooms',function(data){
	rooms_count = data.length;
	let element = $('#rooms-buttons-list');
	
	element.empty();
	
	data.forEach(function(roomName){
		
		let element_add = $('#btn-add-li');
		let myButton = document.createElement('button');
		let button_class = "\"btn btn-secondary\"";
		
		//console.log(button_class);
		myButton = "<button id =\"" + roomName + "\" type=\"button\" class="+ button_class +">" + roomName + "</button>";

		element.append(myButton);


		document.getElementById(roomName).addEventListener('click', function(){
			$("#includedContent").load("/rooms/canvases/canvas.html");
			setIntent(roomName);
		});
	});
	element.append("<button id=\"btn-add\" type=\"button\" class=\"btn btn-light\">Add/Create Canvas</button>");
		document.getElementById('btn-add').addEventListener('click', function(){
			rooms_count++;//increment rooms count
    
			console.log('emit');
			socket.emit('makeRoom', {
				'name': canvas_room_str + rooms_count,
				'path': 'stock_apple.png'
			});
		});
	
	console.log(data);
	
});


function gotoroom(room){
    let room_str = room;
    $('#btn4').on('click', function(){
        $("#includedContent").load("/rooms/canvases/canvas.html");
        setIntent($('#btn4').text());
    })
}
