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

	//The background music is created
	//On Chrome, the user have to press a key in order to let the music start, so it is activated only when the user
	//presses a key
	sound = document.createElement("audio"); //create html element

	sound.src = "mario_08.wav"; //set audio source file
	sound.setAttribute("preload", "auto"); //automatic preload
    sound.setAttribute("controls", "none"); //no controls
    sound.style.display = "none"; //do not display the element


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

	//Drawing matio initial image

	/////////////////////////////////////////////////////////////////
	var render = function () {
		ctx.drawImage(bgImage, 0, 0); 
		renderMario();
	}

	//Mario is now jumping on the ground
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
	 *  Code for walking left/right when the user presses L/R was added
	 *
	 */
	document.body.onkeydown = function(e) {  // listen for a key

    	e = event || window.event;             // any kind of event
    	var keycode = e.charCode || e.keyCode; // any kind of key
		console.log(keycode);

		// The user wants Mario to jump:
    	if(keycode === 13 && Mario.moving == "no") {  

        	Mario.timer = setInterval(render, Mario.timerInterval);

    	} else if( keycode == 76 && (Mario.moving == "no" || Mario.moving == "left") ){ //Users wants Mario to walk Left
    		//and Mario is not already moving in another direction
            //Make him walk left
    		Mario.moving = "left";
			marioWalk();
		} else if (keycode == 82 && (Mario.moving == "no" || Mario.moving == "right")){ //Users wants Mario to walk right
			//and Mario is not moving in another direction
    		//Make him walk right
            Mario.moving = "right";
            marioWalk();
		}

		//play music if is not playing, on Chrome cannot be started before the user presses a key
		if(!audioPlaying) {
            sound.play();
            audioPlaying = true;
        }

    }

    //Call function to face Mario forward when the user releases the keys L/R
    document.body.onkeyup = function(e) {  // listen for a key
        e = event || window.event;             // any kind of event
        var keycode = e.charCode || e.keyCode; // any kind of key
        console.log(keycode);

        if(keycode == 76 || keycode == 82){
        	setTimeout(faceForward, 200);
        	Mario.moving = "no";
		}
    }


    //Change image so that Mario is now faced forward
    function faceForward() {
        ctx.drawImage(bgImage, 0, 0);
        Mario.Image.src = "mario1.png";
        ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
    }
	
} // close draw() 
