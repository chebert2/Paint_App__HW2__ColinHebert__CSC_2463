let current_paint_color = 'black';

// let colors[values_index] ==> {red, orange, yellow, light green, light bluish_teal, blue, pink, brown, white, black}
let colors = ['#ec402b', '#f08734','#fef941', '#6ef63b', '#71fbff', '#0044f8', '#ee5afc', '#734416', '#ffffff', '#000000'];

let x = 0;
let y = 0;

// I used the following p5_tutorial's
// method for smoothing the paint stroke.
//
// credit :  user by name of "jenagosta"  ::
//           5-9: Smooth Lines with Easing - p5.js Web Editor
let easing = 0.05;

let width_val = 25;
let height_val = 25;

// boolean flag
let mousepress_X_GreaterTHAN29_bool = 0;

let startMousePressTime = 0;

// bool flag for noting mouse button
// has been released "..sometime.. of LATE"
let mouseReleased_bool = 0;

// boolean flag for starting the
// first touch of the paint brush
// in an applied brush stroke
let strokeFIRST_RUN_bool = 0;

function mousePressed(){
  if(mouseX >= 29) {
      // set this bool flag to true for initializing later activities
    mousepress_X_GreaterTHAN29_bool = 1;
    
    // details to be used in painting later
    x = mouseX;
    y = mouseY;
    
    startMousePressTime = millis();
    
    mouseReleased_bool = 0;
    
    strokeFIRST_RUN_bool = 1;
    
  } else {
    
    // set up detection of palette color picker pickup
    if(mouseX >= 2 && mouseX <= 27){
      
      // Red box palette click
      if(mouseY >= 2 && mouseY <= 27){
        current_paint_color = colors[0];
      }
      // Orange box palette click
      else if(mouseY >= 30 && mouseY <= 55){
        current_paint_color = colors[1];
      }
      // Yellow box palette click
      else if(mouseY >= 58 && mouseY <= 83){
        current_paint_color = colors[2];
      }
      // Green box palette click
      else if(mouseY >= 86 && mouseY <= 111){
        current_paint_color = colors[3];
      }
      // Light Bluish_Teal box palette click
      else if(mouseY >= 114 && mouseY <= 139){
        current_paint_color = colors[4];
      }
      // Blue box palette click
      else if(mouseY >= 142 && mouseY <= 167){
        current_paint_color = colors[5];
      }
      // Pink box palette click
      else if(mouseY >= 170 && mouseY <= 195){
        current_paint_color = colors[6];
      }
      // Brown box palette click
      else if(mouseY >= 198 && mouseY <= 223){
        current_paint_color = colors[7];
      }
      // White box palette click
      else if(mouseY >= 226 && mouseY <= 251){
        current_paint_color = colors[8];
      } 
      // Black box palette click
      else if(mouseY >= 254 && mouseY <= 279){
        current_paint_color = colors[9];
      } 
    }
  }
}

function mouseReleased() {
  
  mouseReleased_bool = 1;
  
  mousepress_X_GreaterTHAN29_bool = 0;
}

function setup() {

  createCanvas(852, 480);
  background(255);
}

function drawRect(x, y, rgbHex){
  
  fill(rgbHex);
  rect(x, y, width_val, height_val);
  
}

function draw() {
  
  // draw a white sidebar to be featured underneath the palette .. as a preliminary step.
  fill('white');
  noStroke();
  rect(0, 0, 29, 480);
  
  let y_spacer__for_paint_palette = 0;

  for(i=0;i <= 9;i++){

    y_spacer__for_paint_palette += 2;

    noStroke();

    drawRect(2, y_spacer__for_paint_palette, colors[i]);

    y_spacer__for_paint_palette += height_val;

  }
  
    // paint a single (stand-alone) 30px-diameter-DOT
   if( mouseReleased_bool && ( millis() - startMousePressTime ) < 176) {
        
      fill(color(current_paint_color));
      noStroke();
      circle(x, y, 30);
     
      // could assign value for x and y
      // to be used respectively
      // in a later application
      // of another stroke being made, hence.
         // x = mouseX;
         // y = mouseY;
      
     // NOW WE are done with painting a single dot, ...
     // .. so reset this mouseReleased flag param.
      mouseReleased_bool = 0;
    
     } else if(mouseIsPressed && mousepress_X_GreaterTHAN29_bool && (( millis() - startMousePressTime ) > 176 )  &&
              strokeFIRST_RUN_bool) { 

       // re-initialize this to an un-activated normal value
       mouseReleased_bool = 0;
       
       fill(color(current_paint_color));
       noStroke();
       x = mouseX;
       y = mouseY;
       circle(x, y, 30);
       
       strokeFIRST_RUN_bool = 0;
    } 
  
     else if(mouseIsPressed && mousepress_X_GreaterTHAN29_bool && ( ( millis() - startMousePressTime ) > 176) && strokeFIRST_RUN_bool == 0)  { 

       
       // again re-initialize this to an un-activated normal value
       mouseReleased_bool = 0;
       
       fill(color(current_paint_color));
       noStroke();


       // As mentioned before (at the
       // beginning of this program),
       // 
       // I used the following
       // proportioning-/-mathematical element
       //
       // taken from a p5_tutorial-(credit :
       //  " jenagosta  ::  5-9: Smooth Lines
       //    with Easing - p5.js "
       // ____________________________________
       //
       //  concerning a method for smoothing
       // the interval of a paint stroke.
       //
       // Referring to the 'easing' variable
       // mentioned earlier, and listed below here.
       let targetX = mouseX;
       x += (targetX - x) * easing;
       let targetY = mouseY;
       y += (targetY - y) * easing;
  
       circle(x, y, 30);
    } 
}

     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     