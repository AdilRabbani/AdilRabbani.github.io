var bucket = false;                              // variable to check if paint bucket is selected
var triangle = false;                            // variable to check if triangle is selected
var square = false;                              // variable to check if square is selected
var circle = false;                              // variable to check if circle is selected
var pentagon = false;                            // variable to check if pentagon is selected
var hexagon = false;                             // variable to check if hexagon is selected
var star = false;                                // variable to check if star is selected


var triangle_vertices;                           // variable to store triangle vertices
var square_vertices;                             // variable to store square vertices
var pentagon_vertices;                           // variable to store pentagon vertices
var hexagon_vertices;                            // variable to store hexagon vertices
var star_vertices;                               // variable to store star vertices
var circle_vertices_;                            // variable to store circle vertices, yes we need vertices for circle as well...

var FizzyText = function() {                     // dat.gui function
    
  this.Triangle = function() {                   // when triangle option is clicked
  
                                                 // if nothing is selected
      if (bucket == false && square == false && circle == false && triangle == false && pentagon == false && hexagon == false && star == false){  
          $('#selection').fadeOut(300);                              // use jquery and fade out 'Select a tool'
          $("#triangleselected").delay(300).fadeIn(300);             // and fade in 'Triangle Selected'
          triangle = true;                                           // make triangle true
      }
      
      else if (bucket == true){                                      // if bucket was selected
        $('#bucketselected').fadeOut(300);                           // use jquery and fade out 'Bucket Selected'
        $("#triangleselected").delay(300).fadeIn(300);               // and fade in 'Triangle Selected'
          bucket = false;                                            // make bucket false
          triangle = true;                                           // and triangle true
      }
      
      else if (square == true){                                      // if square was selected
        $('#squareselected').fadeOut(300);                           // use jquery and fade out 'Square Selected'
        $("#triangleselected").delay(300).fadeIn(300);               // and fade in 'Triangle Selected'
          square = false;                                            // make square false
          triangle = true;                                           // and triangle true
      }
      
      else if (circle == true){                                      // if circle was selected
        $('#circleselected').fadeOut(300);                           // use jquery and fade out 'Circle Selected'
        $("#triangleselected").delay(300).fadeIn(300);               // and fade in 'Triangle Selected'
          circle = false;                                            // make circle false
          triangle = true;                                           // and triangle true
      }
      
      
      
      else if (pentagon == true){                                    // if pentagon was selected
        $('#pentagonselected').fadeOut(300);                         // use jquery and fade out 'Pentagon Selected'
        $("#triangleselected").delay(300).fadeIn(300);               // and fade in 'Triangle Selected'
          pentagon = false;                                          // make pentagon false
          triangle = true;                                           // and triangle true
      }
      
      else if (hexagon == true){                                     // if hexagon was selected
        $('#hexagonselected').fadeOut(300);                          // use jquery and fade out 'Hexagon Selected'
        $("#triangleselected").delay(300).fadeIn(300);               // and fade in 'Triangle Selected'
          hexagon = false;                                           // make hexagon false
          triangle = true;                                           // and triangle true
      }
      
      else if (star == true){                                        // if star was selected
        $('#starselected').fadeOut(300);                             // use jquery and fade out 'Star Selected'
        $("#triangleselected").delay(300).fadeIn(300);               // and fade in 'Triangle Selected'
          star = false;                                              // make star false
          triangle = true;                                           // and triangle true
      }
      
  };
    
    ///////////////////////////////////////////// All options behave the same way //////////////////////////////////////////////////
    
  this.Square = function() { 
  
      if (triangle == false && bucket == false && circle == false && square == false && pentagon == false && hexagon == false && star == false){
          $('#selection').fadeOut(300);
          $("#squareselected").delay(300).fadeIn(300);
          square = true;
      }
      
      else if (bucket == true){
        $('#bucketselected').fadeOut(300);
        $("#squareselected").delay(300).fadeIn(300);
          bucket = false;
          square = true;
      }
      
      else if (triangle == true){
        $('#triangleselected').fadeOut(300);
        $("#squareselected").delay(300).fadeIn(300);
          triangle = false;
          square = true;
      }
      
      else if (circle == true){
        $('#circleselected').fadeOut(300);
        $("#squareselected").delay(300).fadeIn(300);
          circle = false;
          square = true;
      }
      
      else if (pentagon == true){
        $('#pentagonselected').fadeOut(300);
        $("#squareselected").delay(300).fadeIn(300);
          pentagon = false;
          square = true;
      }
      
      else if (hexagon == true){
        $('#hexagonselected').fadeOut(300);
        $("#squareselected").delay(300).fadeIn(300);
          hexagon = false;
          square = true;
      }
      
      else if (star == true){
        $('#starselected').fadeOut(300);
        $("#squareselected").delay(300).fadeIn(300);
          star = false;
          square = true;
      }
  
  };
    this.PaintBucket = function() {
        
      if (triangle == false && square == false && circle == false && bucket == false && pentagon == false && hexagon == false && star == false){
          $('#selection').fadeOut(300);
          $("#bucketselected").delay(300).fadeIn(300);
          bucket = true;
      }
      
      else if (triangle == true){
        $('#triangleselected').fadeOut(300);
        $("#bucketselected").delay(300).fadeIn(300);
          bucket = true;
          triangle = false;
      }
        
    else if (square == true){
        $('#squareselected').fadeOut(300);
        $("#bucketselected").delay(300).fadeIn(300);
          bucket = true;
          square = false;
        }
        
    else if (circle == true){
        $('#circleselected').fadeOut(300);
        $("#bucketselected").delay(300).fadeIn(300);
          bucket = true;
          circle = false;
        }
        
        
    else if (pentagon == true){
        $('#pentagonselected').fadeOut(300);
        $("#bucketselected").delay(300).fadeIn(300);
          pentagon = false;
          bucket = true;
      }
      
      else if (hexagon == true){
        $('#hexagonselected').fadeOut(300);
        $("#bucketselected").delay(300).fadeIn(300);
          hexagon = false;
          bucket = true;
      }
      
      else if (star == true){
        $('#starselected').fadeOut(300);
        $("#bucketselected").delay(300).fadeIn(300);
          star = false;
          bucket = true;
      }
        
    };
    
    this.Circle = function(){
        
    if (triangle == false && square == false && circle == false && bucket == false && hexagon == false && star == false && pentagon == false){
          $('#selection').fadeOut(300);
          $("#circleselected").delay(300).fadeIn(300);
          circle = true;
      }
      
      else if (triangle == true){
        $('#triangleselected').fadeOut(300);
        $("#circleselected").delay(300).fadeIn(300);
          circle = true;
          triangle = false;
      }
        
    else if (square == true){
        $('#squareselected').fadeOut(300);
        $("#circleselected").delay(300).fadeIn(300);
          circle = true;
          square = false;
        }
        
        else if (bucket == true){
        $('#bucketselected').fadeOut(300);
        $("#circleselected").delay(300).fadeIn(300);
          circle = true;
          bucket = false;
        }
        
        else if (hexagon == true){
        $('#hexagonselected').fadeOut(300);
        $("#circleselected").delay(300).fadeIn(300);
          circle = true;
          hexagon = false;
        }
        
        else if (star == true){
        $('#starselected').fadeOut(300);
        $("#circleselected").delay(300).fadeIn(300);
          circle = true;
          star = false;
        }
        
        else if (pentagon == true){
        $('#pentagonselected').fadeOut(300);
        $("#circleselected").delay(300).fadeIn(300);
          pentagon = false;
          circle = true;
        }
        
    };
    
    this.Pentagon = function(){
        
    if (triangle == false && square == false && circle == false && bucket == false && hexagon == false && star == false && pentagon == false){
          $('#selection').fadeOut(300);
          $("#pentagonselected").delay(300).fadeIn(300);
          pentagon = true;
      }
      
      else if (triangle == true){
        $('#triangleselected').fadeOut(300);
        $("#pentagonselected").delay(300).fadeIn(300);
          pentagon = true;
          triangle = false;
      }
        
    else if (square == true){
        $('#squareselected').fadeOut(300);
        $("#pentagonselected").delay(300).fadeIn(300);
          pentagon = true;
          square = false;
        }
        
        else if (bucket == true){
        $('#bucketselected').fadeOut(300);
        $("#pentagonselected").delay(300).fadeIn(300);
          pentagon = true;
          bucket = false;
        }
        
        else if (hexagon == true){
        $('#hexagonselected').fadeOut(300);
        $("#pentagonselected").delay(300).fadeIn(300);
          pentagon = true;
          hexagon = false;
        }
        
        else if (star == true){
        $('#starselected').fadeOut(300);
        $("#pentagonselected").delay(300).fadeIn(300);
          pentagon = true;
          star = false;
        }
        
        else if (circle == true){
        $('#circleselected').fadeOut(300);
        $("#pentagonselected").delay(300).fadeIn(300);
          pentagon = true;
          circle = false;
        }
        
    };
    
    this.Hexagon = function(){
        
    if (triangle == false && square == false && circle == false && bucket == false && hexagon == false && star == false && pentagon == false){
        console.log(1);
          $('#selection').fadeOut(300);
          $("#hexagonselected").delay(300).fadeIn(300);
          hexagon = true;
      }
      
      else if (triangle == true){
          console.log(2);
        $('#triangleselected').fadeOut(300);
        $("#hexagonselected").delay(300).fadeIn(300);
          hexagon = true;
          triangle = false;
      }
        
    else if (square == true){
        console.log(3);
        $('#squareselected').fadeOut(300);
        $("#hexagonselected").delay(300).fadeIn(300);
          hexagon = true;
          square = false;
        }
        
        else if (bucket == true){
            console.log(4);
        $('#bucketselected').fadeOut(300);
        $("#hexagonselected").delay(300).fadeIn(300);
          hexagon = true;
          bucket = false;
        }
        
    else if (pentagon == true){
        console.log(5);
        $('#pentagonselected').fadeOut(300);
        $("#hexagonselected").delay(300).fadeIn(300);
          hexagon = true;
          pentagon = false;
        }
        
        else if (star == true){
            console.log(6);
        $('#starselected').fadeOut(300);
        $("#hexagonselected").delay(300).fadeIn(300);
          hexagon = true;
          star = false;
        }
        
        else if (circle == true){
            console.log(7);
        $('#circleselected').fadeOut(300);
        $("#hexagonselected").delay(300).fadeIn(300);
          hexagon = true;
          circle = false;
        }
        
    };
    
    this.Star = function(){
        
      if (triangle == false && square == false && circle == false && bucket == false && hexagon == false && star == false && pentagon == false){
          $('#selection').fadeOut(300);
          $("#starselected").delay(300).fadeIn(300);
          star = true;
      }
      
      else if (triangle == true){
        $('#triangleselected').fadeOut(300);
        $("#starselected").delay(300).fadeIn(300);
          star = true;
          triangle = false;
      }
        
    else if (square == true){
        $('#squareselected').fadeOut(300);
        $("#starselected").delay(300).fadeIn(300);
          star = true;
          square = false;
        }
        
        else if (bucket == true){
        $('#bucketselected').fadeOut(300);
        $("#starselected").delay(300).fadeIn(300);
          star = true;
          bucket = false;
        }
        
        else if (hexagon == true){
        $('#hexagonselected').fadeOut(300);
        $("#starselected").delay(300).fadeIn(300);
          star = true;
          hexagon = false;
        }
        
        else if (pentagon == true){
        $('#pentagonselected').fadeOut(300);
        $("#starselected").delay(300).fadeIn(300);
          pentagon = false;
          star = true;
        }
        
        else if (circle == true){
        $('#circleselected').fadeOut(300);
        $("#starselected").delay(300).fadeIn(300);
          star = true;
          circle = false;
        }
        
    };
    
  ///////////////////////////////////////////////////// tool options end ////////////////////////////////////////////////////////////////    
    
  this.CircleShiftX = 0.0;                                    // value for shifting circle in x direction
  this.CircleShiftY = 0.0;                                    // value for shifting circle in y direction         
  this.BucketAlpha = 1.0;                                     // alpha for paint bucket
  this.ShapeAlpha = 1.0;                                      // alhpa for color of shape
  this.BucketColor = [ 100 , 255 , 255 ];                     // paint bucket color
  this.ShapeColor = [ 0 , 0 , 0 ];                            // Shape color
  this.Rotate = 0;                                            // Rotation of shapes
  this.ShapeSize = 25;                                        // shapes size
    
};

window.onload = function() {                                  // as the window loads 
    
 var canvas = document.getElementById('webgl');                                // get canvas by id
 var gl = canvas.getContext("webgl", {preserveDrawingBuffer:true} );           // get webgl and set flag for preserveDrawingBuffer, the                                                                                     // reason for doing this is a problem in webgl. As a click                                                                                   // event is called, webgl has a behavior of automatically                                                                                   // clearing the canvas.The only way not to clear the canvas on                                                                               // click is to set this flag.
 if (!gl){
		console.log('Failed to find context');
 }
    
  var text = new FizzyText();                                                  // get the function to be used in dat.gui
  var gui = new dat.GUI();                                                     // create a new dat.gui
    
    gui.add(text,'PaintBucket');                                               // add paint bucket option to it
    gui.add(text, 'Triangle');                                                 // add triangle option to it
    gui.add(text,'Square');                                                    // add square option to it
    gui.add(text,'Circle');                                                    // add circle option to it
    gui.add(text,'Pentagon');                                                  // add pentagon option to it
    gui.add(text,'Hexagon');                                                   // add hexagon option to it
    gui.add(text,'Star');                                                      // add star option to it
    gui.add(text,'CircleShiftX',-1.0,1.0);                                     // add option to shift circle in x direction
    gui.add(text,'CircleShiftY',-1.0,1.0);                                     // add option to shift circle in y direction
    gui.add(text,'ShapeSize',1,50);                                            // add option to change shape size
    gui.add(text,'Rotate',0,360);                                              // add option to rotate a shape
    gui.addColor(text,'ShapeColor');                                           // add option to change shape color
    gui.addColor(text , 'BucketColor');                                        // add option to change paint bucket color
    gui.add(text, 'BucketAlpha', 0.0, 1.0);                                    // add option to change bucket color alpha
    gui.add(text, 'ShapeAlpha', 0.0 , 1.0);                                    // add option to change shape color alpha
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );       // initialize vertex shaders and fragment shaders
	gl.useProgram (program);                                                   // compile
	gl.program = program;

	var a_Position = gl.getAttribLocation(program, 'a_Position');              // get the attribute a_Position from vertex shader
	if (a_Position < 0) { 
		console.log ("Failed to Get Position"); 
		return;	
	}
    
    var u_FragColor = gl.getUniformLocation(program, 'u_FragColor');           // get the attribute u_FragColor from fragment shader
	if (u_FragColor < 0) { 
		console.log ("Failed to Get Color"); 
		return;	
	}
    
    canvas.onmousedown = function(ev) {                       // call a mouse click event if clicked on canvas and pass all options to it
        click(ev, gl, canvas,text.BucketColor,text.BucketAlpha,text.ShapeColor,text.ShapeAlpha,text.ShapeSize/200,text.Rotate,text.CircleShiftX,text.CircleShiftY,bucket,triangle,square,circle,pentagon,hexagon,star,a_Position,u_FragColor,program);
    };
    
};

                                                             // initVertices function which initializes vertices of different shapes
function initVertices(program, gl, x , y , triangle , square,circle,pentagon,hexagon,star,CircleShiftX,CircleShiftY,ShapeSize,RotateBy){
    
    if (triangle == true){                                             // if triangle was selected
    triangle_vertices = [0 - ShapeSize, 0 - ShapeSize,0 + ShapeSize,0 - ShapeSize , 0 ,0 + (ShapeSize) ]; // make a triangle at origin(0,0)
        
    var noOfDim = 2;                                                   // we are working in 2d
	var numberOfVertices = triangle_vertices.length / noOfDim;         // calculate number of vertices, obviously 3
	
	var vertexBuffer = gl.createBuffer();                                               // creating a buffer for vertices
	if (!vertexBuffer){ console.log('Failed to create the buffer object ');	return -1;}
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);                                       // binding buffer
	gl.bufferData(gl.ARRAY_BUFFER, flatten(triangle_vertices), gl.STATIC_DRAW);         // setting data to the buffer
	
	var a_Position = gl.getAttribLocation(program, 'a_Position');                       // getting the a_Position attribute from vs
	if (a_Position < 0) { console.log ("Failed to Get Position"); return;	}
	
	gl.vertexAttribPointer(a_Position, noOfDim, gl.FLOAT, false, 0, 0);                 // pointing it to the data previously added to buffer
	gl.enableVertexAttribArray(a_Position);                                             // and enabling vertex attrib array
	
	return numberOfVertices;                                                            // returning number of vertices, obviously 3
        
    }
    
    else if (square == true){                                         // if square was selected
        
                                                                                        // make a square at origin(0,0)
        square_vertices = [0 - ShapeSize,0 - ShapeSize,0 + ShapeSize,0 - ShapeSize,0 + ShapeSize,0 + ShapeSize,0 - ShapeSize,0 + ShapeSize];
        
        var noOfDim = 2;                                                                // we are working in 2d
        var numberOfVertices = square_vertices.length / noOfDim;                        // calculating number of vertices, obviously 4

        var vertexBuffer = gl.createBuffer();                                           
        if (!vertexBuffer){ console.log('Failed to create the buffer object ');	return -1;}

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(square_vertices), gl.STATIC_DRAW);

        var a_Position = gl.getAttribLocation(program, 'a_Position');
        if (a_Position < 0) { console.log ("Failed to Get Position"); return;	}

        gl.vertexAttribPointer(a_Position, noOfDim, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);

        return numberOfVertices;
    }
    
    else if (hexagon == true){                                           // if hexagon was selected
        
        // create a diff variable. This variable is actually used to cater different sizes of the hexagon
        
        //                 diff              diff
        //                    \             /
        //                     \ __________/
        //                      /          \
        //                     /            \
        //                    /              \
        //                   |                |
        //                   |                |
        //                   |                |
        //                    \              /
        //                     \            /
        //                      \__________/
        //                     /           \
        //                    /             \
        //                  diff            diff
        
        var diff;                                                       
        
        ////////////////////////////////////////// diff being calculated using if conditions ////////////////////////////////
        
        if ((ShapeSize - 0.15) < 0.1 && (ShapeSize - 0.15) > 0){
            diff = (ShapeSize) - ((ShapeSize - 0.1));
        }
        
        else if ((ShapeSize - 0.1) < 0.1 && (ShapeSize - 0.1) > 0){
            diff = (ShapeSize) - ((ShapeSize - 0.05));
        }
        
        else if ((ShapeSize - 0.05) < 0.1 && (ShapeSize - 0.05) > 0){
            diff = (ShapeSize) - ((ShapeSize - 0.03));
        }
        
        else if ((ShapeSize - 0.01) < 0.1 && (ShapeSize - 0.01) > 0){
            diff = (ShapeSize) - ((ShapeSize - 0.01));
        }
        
        else {
            diff = (ShapeSize) - ((ShapeSize - 0.15));
        }
        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        
                                                           // create hexagon using diff at origin(0,0)
        hexagon_vertices = [ShapeSize,0.0,diff,ShapeSize,-diff,ShapeSize, -ShapeSize,0.0, -diff,-ShapeSize, diff,-ShapeSize];
        
        var noOfDim = 2;
        var numberOfVertices = hexagon_vertices.length / noOfDim;

        var vertexBuffer = gl.createBuffer();
        if (!vertexBuffer){ console.log('Failed to create the buffer object ');	return -1;}

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(hexagon_vertices), gl.STATIC_DRAW);

        var a_Position = gl.getAttribLocation(program, 'a_Position');
        if (a_Position < 0) { console.log ("Failed to Get Position"); return;	}

        gl.vertexAttribPointer(a_Position, noOfDim, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);

        return numberOfVertices;
    }
    
    else if (pentagon == true){                                 // if pentagon was selected
        
        // create a diff variable. This variable is actually used to cater different sizes of the pentagon
        
        
        //                         /\ 
        //                        /  \     
        //                       /    \      
        //                      /      \    
        //                     /        \
        //                     \        /  
        //                      \      /     
        //                       \____/
        //                       /    \
        //                      /      \
        //                    diff     diff
        
        var diff;
        
        ///////////////////////////////////////////// diff being calculated using if conditions ////////////////////////////
        
        if ((ShapeSize - 0.15) < 0.1 && (ShapeSize - 0.15) > 0){
            diff = (ShapeSize) - ((ShapeSize - 0.1));
        }
        
        else if ((ShapeSize - 0.1) < 0.1 && (ShapeSize - 0.1) > 0){
            diff = (ShapeSize) - ((ShapeSize - 0.05));
        }
        
        else if ((ShapeSize - 0.05) < 0.1 && (ShapeSize - 0.05) > 0){
            diff = (ShapeSize) - ((ShapeSize - 0.03));
        }
        
        else if ((ShapeSize - 0.01) < 0.1 && (ShapeSize - 0.01) > 0){
            diff = (ShapeSize) - ((ShapeSize - 0.01));
        }
        
        else {
            diff = (ShapeSize) - ((ShapeSize - 0.15));
        }
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
                                                       // make a pentagon using diff at origin(0,0)
        pentagon_vertices = [ShapeSize,0.0,0.0,ShapeSize,-(ShapeSize),0.0,-diff,-(ShapeSize),diff,-(ShapeSize)];
        
        var noOfDim = 2;
        var numberOfVertices = pentagon_vertices.length / noOfDim;

        var vertexBuffer = gl.createBuffer();
        if (!vertexBuffer){ console.log('Failed to create the buffer object ');	return -1;}

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(pentagon_vertices), gl.STATIC_DRAW);

        var a_Position = gl.getAttribLocation(program, 'a_Position');
        if (a_Position < 0) { console.log ("Failed to Get Position"); return;	}

        gl.vertexAttribPointer(a_Position, noOfDim, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);

        return numberOfVertices;
    }
    
    else if (star == true){                 // if star was selected
         
                                            // make a star at origin(0,0)
        star_vertices = [ShapeSize/1.5,ShapeSize*0.15,   ShapeSize*1.5,ShapeSize,  ShapeSize/2,ShapeSize,  0.0, ShapeSize*2,  -(ShapeSize/2),ShapeSize, 
                        -(ShapeSize)*1.5,ShapeSize,   -(ShapeSize/1.5),ShapeSize*0.15,    -(ShapeSize)*1.2,-(ShapeSize),   0.0, -(ShapeSize/2),    ShapeSize*1.2,-(ShapeSize)];
        
        var noOfDim = 2;
        var numberOfVertices = star_vertices.length / noOfDim;

        var vertexBuffer = gl.createBuffer();
        if (!vertexBuffer){ console.log('Failed to create the buffer object ');	return -1;}

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(star_vertices), gl.STATIC_DRAW);

        var a_Position = gl.getAttribLocation(program, 'a_Position');
        if (a_Position < 0) { console.log ("Failed to Get Position"); return;	}

        gl.vertexAttribPointer(a_Position, noOfDim, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);

        return numberOfVertices;
    }
    
    
    
    else if (circle == true){                                       // if circle was selected, this was difficult to make :/
        
                        // set a variable circle_ with origin at position of mouse click and radius according to the shape size selected
    var circle_ = {x: x, y: y, r: ShapeSize};
    var noOfDim = 2;                                             // we are working in 2d
    var numberofFans = 38;                                               // time to explain this
    
    //             numberofFans is used with degreesPerFan to make a circle. How?
    //
    //             assume this is our circle, it is really difficult making a circle in comments.......
    //             this is like a web in a circle and numFans together with degreePerFan make points around the origin, these points
    //             together make a circle which is colored at the end. The greater the numFans, the greater the number of points and
    //             the smoother the circle.
    //                      
    //                       __
    //                      /| \
    //                     / |  \
    //                    /  |   \
    //                   /\  |   /\
    //                  /  \ |  /  \
    //                 /    \| /    \
    //                 |_____|/_____|
    //                  \   /|\     /
    //                   \ / | \   /
    //                    \  |  \ /
    //                     \ |   /
    //                      \|__/
    //                        
    //                     
    //             As i was working with this I also find something interesting, if add a value in the circle_vertices_x and
    //             circle_vertices_y i can shift the circle in that direction forming something like a petal.
    //
        
    var degreesPerFan = (2 * Math.PI) / numberofFans;
    
    var circle_vertices = [circle_.x, circle_.y];
    
    for(var i = 0; i <= numberofFans; i++) {                             // loop from 0 to numberofFans
      var index = noOfDim * i + 2;                                          // here noOfDim is being used because x and y are already in it
      var angle = degreesPerFan * (i+1);                                 // calculating angle
      circle_vertices[index] = (circle_.x + Math.cos(angle) * circle_.r) + CircleShiftX;     // using formula (x + rCosQ) + shiftX
      circle_vertices[index + 1] = (circle_.y + Math.sin(angle) * circle_.r) + CircleShiftY; // using formula (y + rSinQ) + shiftY
    }

    var circle_vertices_ = new Float32Array(circle_vertices);
                
    var vertexBuffer = gl.createBuffer();
	if (!vertexBuffer){ console.log('Failed to create the buffer object ');	return -1;}
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, circle_vertices_, gl.STATIC_DRAW);
	
	var a_Position = gl.getAttribLocation(program, 'a_Position');
	if (a_Position < 0) { console.log ("Failed to Get Position"); return;	}
    
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, noOfDim * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(a_Position);
        
    return circle_vertices.length/noOfDim;
        
    }
    
}

function click(ev, gl, canvas,Bucketcolor,Bucketalpha,Shapecolor,Shapealpha,ShapeSize,RotateBy,CircleShiftX,CircleShiftY,bucket,triangle,square,circle,pentagon,hexagon,star,a_Position,u_FragColor,program){
    
    if (bucket == true){                                                 // if bucket was selected
        render_bucket(gl,canvas,Bucketcolor,Bucketalpha);                // call the render bucket function
    }
    
                                                                         // if any other shape was selected
    
    else if (triangle == true || square == true || circle == true || pentagon == true || hexagon == true || star == true){
        
        var x = (((ev.pageX)/canvas.width)*2) - 1;                       // get the x position where the mouse was clicked
        var y = (((ev.pageY)/canvas.height)*(-2) + 1);                   // get the y position where the mouse was clicked

                                                                         // call the initVertices function
        
        var numberOfVertices = initVertices(program, gl , x , y, triangle ,                   square,circle,pentagon,hexagon,star,CircleShiftX,CircleShiftY,ShapeSize,RotateBy);
        
                                                                         // call the render_shape function
        
        render_shape(gl, a_Position, u_FragColor , numberOfVertices , triangle , square , circle,pentagon,hexagon,star, Bucketcolor,Bucketalpha, Shapecolor, Shapealpha,RotateBy,x,y);
    }
}

function render_bucket(gl,canvas,Bucketcolor,Bucketalpha){            // render bucket function clears the screen with the selected color
    gl.clearColor(Bucketcolor[0]/255, Bucketcolor[1]/255, Bucketcolor[2]/255, Bucketalpha);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

                         // render shape function checks which shape was selected, applies transformations to it and renders it

function render_shape(gl, a_Position, u_FragColor , numberOfVertices , triangle , square, circle,pentagon,hexagon,star, Bucketcolor , Bucketalpha, Shapecolor , Shapealpha,RotateBy,x,y){
    
        if (triangle == true){                                            // if triangle was true 
            var modelMatrix = new Matrix4();                              // create a model matrix for applying transformations
            modelMatrix.translate(x,y,0.0);                               // translate it to the position where it was clicked
            modelMatrix.rotate(RotateBy,0.0,0.0,1.0);                     // rotate it according to the value in rotation slider
            initTransformations(gl, modelMatrix);                         // apply transformations
            gl.uniform4f(u_FragColor, Shapecolor[0]/255, Shapecolor[1]/255, Shapecolor[2]/255, Shapealpha);  // apply the color
            gl.drawArrays(gl.TRIANGLES, 0, numberOfVertices);             // draw the shape
        }
    
                                                    // if a shape was selected other than triangle or circle
        else if (square == true || hexagon == true || pentagon == true || star == true){
            var modelMatrix = new Matrix4();                              // create a model matrix for applying transformations
            modelMatrix.translate(x,y,0.0);                               // translate it to the position where it was clicked
            modelMatrix.rotate(RotateBy,0.0,0.0,1.0);                     // rotate it according to the value in rotation slider
            initTransformations(gl, modelMatrix);                         // apply transformations
            gl.uniform4f(u_FragColor, Shapecolor[0]/255, Shapecolor[1]/255, Shapecolor[2]/255, Shapealpha);   // apply the color
            gl.drawArrays(gl.TRIANGLE_FAN, 0, numberOfVertices);          // draw the shape
        }
    
        else if (circle == true){                                         // if circle was selected
            var modelMatrix = new Matrix4();                              // create a model matrix for applying transformations
    // just apply the transformations without doing anything, there is no sense in rotating a circle 
    // and circle already renders on the position of the circle
            initTransformations(gl, modelMatrix);                         
            gl.uniform4f(u_FragColor, Shapecolor[0]/255, Shapecolor[1]/255, Shapecolor[2]/255, Shapealpha);   // apply the color
            gl.drawArrays(gl.TRIANGLE_FAN, 0, numberOfVertices);          // draw the shape
        }
}

function initTransformations(gl, modelMatrix){                       // initTransformations function applies transformations to shapes
	var transformationMatrix = gl.getUniformLocation(gl.program, 'transformationMatrix');        // get the transformationMatrix from vs
	gl.uniformMatrix4fv(transformationMatrix, false, modelMatrix.elements);                      // set its value
}