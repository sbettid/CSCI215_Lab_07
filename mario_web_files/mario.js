// JavaScript for creating interactive animations on a canvas 
////////////////////////////////////////////////////////////////////
// Create a Mario object which contains all the info about Mario
// Objects are nice because they allow up to keep all the relevant
// info about an item in one place.

var Mario;
////////////////////////////////////////////////////////////////////


window.onload = init; // calls the function named "init"
// declare the background image
var bgImage = new Image();


//variable for playing audio
var audioPlaying = false;
var sound;
// Is called when the window loads;
function init() {
	
	// Initialize Mario Object
	// TODO: Put Mario on the ground instead of the cloud
	Mario = {
		x: 20,
		y: 615,
		w: 50,
		h: 80,
		JumpSound: new Audio('jump.wav'),
		Image: (function() {
			var temp = new Image();
			temp.src = "mario1.png";
			return temp;})(),
		moving: "no",
		timer: "",
		timerInterval: 10
	};

	bgImage.src = "marioBG.jpg";
	draw();

	// TODO: (OPTIONAL) set mario_08.wav as background music
	sound = document.createElement("audio"); //create html element

	sound.src = "mario_08.wav"; //set audio source file
	sound.setAttribute("preload", "auto"); //automatic preload
    sound.setAttribute("controls", "none"); //no controls
    sound.style.display = "none"; //do not display the element

	sound.pla();
	document.body.appendChild(sound);

}

////////////////////////////////////////////////////////////////////

function draw() {

	// Get Drawing Area
	var ctx = document.getElementById("mario_canvas").getContext("2d");
	
	// If you want to display images on the canvas when it is initially
	// loaded, you must do it this way
	bgImage.onload = function(){
		ctx.drawImage(bgImage, 0, 0);

        ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h );
	}

	/*
	 * TODO: Draw Mario's initial image
	 */

	/////////////////////////////////////////////////////////////////
	var render = function () {
		ctx.drawImage(bgImage, 0, 0); 
		renderMario();
	}

	/*
	 * TODO: Alter the y coordinates so Mario will jump while on the ground
	 */
	function renderMario(){
		if (Mario.y > 535 && Mario.moving == "up") {
			//console.log("Mario position: " + Mario.y);
			Mario.Image.src = "mario2.png";
			ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
			// Change the y value each time 
			Mario.y -= 5; // move 5 px up
		}else if(Mario.y <= 535 && Mario.moving == "up"){
			Mario.moving = "down";
		} else if(Mario.y < 615 && Mario.moving == "down"){
           // console.log("Mario position: " + Mario.y);
			Mario.Image.src = "mario2.png";
			ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
			Mario.y += 5; // move 5 px back down after a jump
		}else if(Mario.y == 615 && Mario.moving == "no"){
			Mario.moving = "up";
			Mario.JumpSound.play();
		}else{
			Mario.moving = "no";
			Mario.Image.src = "mario1.png";
			ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
			clearInterval(Mario.timer); // kills the timer
			//console.log("Mario is now standing");
		}	
	}
	///////////////////////////////////////////////////////////////////


	/*
		Function that makes Mario walk either to the left or to the right
		making sure that he does not walk outside the screen
	 */

	function marioWalk(){

		if(Mario.moving =="left" && Mario.x >= 20){
            ctx.drawImage(bgImage, 0, 0);
            Mario.Image.src = "marioturnsleft.png";
            ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
            Mario.x -= 10;
            console.log("Mario going left");

		} else if (Mario.moving == "right" && Mario.x <= 1100){
            ctx.drawImage(bgImage, 0, 0);
            Mario.Image.src = "marioturnsright.png";
            ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
            Mario.x += 10;
            console.log("Mario going right");

		}
	}

	/* Monitor key strokes for user input:
	 *
	 * If Enter/Return is pressed, then call the render function
	 * which paints the new scene to the canvas.
	 *
	 * TODO: Add code to set Mario image to proper image whether L or R button pressed
	 * TODO: Stop Mario if he runs out of room
	 *
	 */
	document.body.onkeydown = function(e) {  // listen for a key

    	e = event || window.event;             // any kind of event
    	var keycode = e.charCode || e.keyCode; // any kind of key
		console.log(keycode);

		// The user wants Mario to jump:
    	if(keycode === 13 && Mario.moving == "no") {  

        	Mario.timer = setInterval(render, Mario.timerInterval);

    	} else if( keycode == 76){ //Users wants Mario to walk Left
            //Make him walk left
    		Mario.moving = "left";
			marioWalk();
		} else if (keycode == 82){ //Users wants Mario to walk right

    		//Make him walk right
            Mario.moving = "right";
            marioWalk();
		}

		//play music if is not playing
		if(!audioPlaying)
            sound.play();

    }

    /* TODO:
     * TODO: Capture keycodes for L and R. In each, set a timeout that calls a function
     * TODO: to face Mario forward after 200 ms. HINT: setTimeout(function, timeInMilliSecs)
     */
    document.body.onkeyup = function(e) {  // listen for a key
        e = event || window.event;             // any kind of event
        var keycode = e.charCode || e.keyCode; // any kind of key
        console.log(keycode);

        if(keycode == 76 || keycode == 82){
        	setTimeout(faceForward, 200);
        	Mario.moving = "no";
		}
    }


    /*
     * TODO: Face Mario forward. Do not forget to draw the background image first
     */
    function faceForward() {
        ctx.drawImage(bgImage, 0, 0);
        Mario.Image.src = "mario1.png";
        ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
    }
	
} // close draw() 
