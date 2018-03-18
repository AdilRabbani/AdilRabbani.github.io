var bucket = false;                                      // variable to check if paint bucket is selected
var trianglulated_triangle = false;                      // variable to check if triangle is selected
var trianglulated_square = false;                        // variable to check if pentagon is selected
var pentagon = false;

var vertices_1 = [];                                     // vertices_1 to store triangle
var vertices_2 = [];                                     // vertices_1 and vertices_2 together make a square
var vertices_3 = [];                              // vertices_1,vertices_2,vertices_3,vertices_4 and vertices_5 together make a pentagon
var vertices_4 = [];
var vertices_5 = [];

var program;                                             // variable to store gl.program
var a_Position;                                          // variable to store a_Position from vs
var u_FragColor;                                         // variable to store u_FragColor from fs

var points = [];                                         // variable to store points of tessellated shape
var colors = [];                                         // variable to store random colors of tessellated shape

var random_color_1;                                      // random color Red part
var random_color_2;                                      // random color Blue part
var random_color_3;                                      // random color Green part

var NumTimesToSubdivide = 0;                             // variable to check how many divisions to make for tessellation

var canvas;                                              // variable to store canvas
var gl;                                                  // variable to store WebGL

var angle = 0;                                           // angle to track how much to twist a shape


function getPolygon(height, noOfCorners) {
	var vertices = [];
	for (var i = 0; i < noOfCorners; ++i) {
		var x = (height) * Math.sin(i / noOfCorners * 2 * Math.PI);
		var y = (height) * Math.cos(i / noOfCorners * 2 * Math.PI);
		vertices.push([x,y]);
	}
	return vertices;
}

function getPolygon_2(height, noOfCorners) {
	var vertices = [];
    var counter = 0;
	for (var i = 0; i < noOfCorners * 3; ++i) {
		var x = (height) * Math.sin(i / noOfCorners * 2 * Math.PI);
		var y = (height) * Math.cos(i / noOfCorners * 2 * Math.PI);
        
         counter = counter + 1;
        
        if (counter == 2){
            i = i - 1;
            vertices.push([x,y]);
            vertices.push([0,0]);
            counter = 0;
        }
        else{
		vertices.push([x,y]);
        }
	}
    
    original_vertices = [];
    
    for (var i = 0; i < noOfCorners * 3; ++i)
        {
            original_vertices.push(vertices[i]);
        }
    
    vertices = [];
    
	return original_vertices;
}

// bisect function is used to divide a triangle further, u and v are the points, and s is the point where to bisect
//
//
//                             v /\ v
//                              /  \
//                             /    \
//                            /      \
//                           /        \
//                        s /          \ s
//                         /            \
//                        /              \
//                       /                \
//                    u /__________________\ u
//
//                     u         s          v  
//
function bisect( u, v, s )                               
{
    
    var result = [];
    for ( var i = 0; i < u.length; ++i ) {
        result.push( (1.0 - s) * u[i] + s * v[i] );
    }

    return result;
}

// function triangle pushes a triangle's points in the points array, also pushing a color with it in colors array

function triangle( a, b, c )
{
    points.push( a, b, c );
    colors.push(random_color_1,random_color_2,random_color_3,1.0);
    colors.push(random_color_1,random_color_2,random_color_3,1.0);
    colors.push(random_color_1,random_color_2,random_color_3,1.0);
}

// function twist, twists a vertex given the origin x,y
function twist(a,x,y){
    
    var distance = Math.sqrt((a[0]*a[0]) + (a[1]*a[1]));
    var twist = (Math.PI/180)*angle;
    
    var twist_1_1 = a[0]*Math.cos(distance*twist) - a[1]*Math.sin(distance*twist);
    var twist_1_2 = a[0]*Math.sin(distance*twist) + a[1]*Math.cos(distance*twist);
    
    return [twist_1_1,twist_1_2];
    
}

// function divideTriangle runs recursively, I took help for this from the Book 'Interactive Computer Graphics - A Top Down Approach with
// WebGL'. It had a topic on Sierpinski Gasket, I used that explanation to further implement tessellation from it

function divideTriangle( a, b, c, count,x,y)
{

    if ( count === 0 ) {
        random_color_1 = Math.random();
        random_color_2 = Math.random();
        random_color_3 = Math.random();
        a = twist(a,x,y);
        b = twist(b,x,y);
        c = twist(c,x,y);
        triangle( a, b, c);
    }
    else {
        
        var ab = bisect( a, b, 0.5 );                          // bisecting each side of the triangle from the middle
        var ac = bisect( a, c, 0.5 );
        var bc = bisect( b, c, 0.5 );
        
        --count;                                               // decrementing the number of triangles to be made (amount of tessellation)

        divideTriangle( a, ab, ac, count );                    // calling recursively
        divideTriangle( c, ac, bc, count );
        divideTriangle( b, bc, ab, count );
        divideTriangle( ab, ac, bc, count );
        
    }
}

// function TriangulatedTriangle makes just one triangle and calls divideTriangle to do all the tessellation
function TriangulatedTriangle(x,y,ShapeSize,NumTimesToSubdivide){
    
    vertices_1 = getPolygon(ShapeSize,3);
    
    
    points = [];
    colors = [];
        
        divideTriangle( vertices_1[0], vertices_1[1], vertices_1[2],
                    NumTimesToSubdivide,x,y);

            //  Load shaders and initialize attribute buffers

            program = initShaders( gl, "vertex-shader", "fragment-shader" );
            gl.useProgram( program );

            gl.program = program;
    
            // Load the data into the GPU

            bufferId = gl.createBuffer();
            gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
            gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

            // Associate out shader variables with our data buffer

            a_Position = gl.getAttribLocation( program, "a_Position" );
            gl.vertexAttribPointer( a_Position, 2, gl.FLOAT, false, 0, 0 );
            gl.enableVertexAttribArray( a_Position );

            // creating a buffer for color
    
            var colorBuffer = gl.createBuffer();
            if (!colorBuffer){ console.log('Failed to create the buffer object ');	return -1;}
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

            var a_Color = gl.getAttribLocation(program, "a_Color");
            if (a_Color < 0) { console.log ("Failed to Get Color"); return;	}

            gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(a_Color);

            render(x,y);
    
}


// function Triangulated_Square makes two right angled triangles to form a sqaure and then further calls divideTriangle on each of them
function Triangulated_Square(x,y,ShapeSize,NumTimesToSubdivide){
    
    vertices_1 = getPolygon_2(ShapeSize,4);
    
    points = [];
    colors = [];
        
        divideTriangle( vertices_1[0], vertices_1[1], vertices_1[2],
                    NumTimesToSubdivide);
        divideTriangle( vertices_1[3],vertices_1[4],vertices_1[5],NumTimesToSubdivide);
    divideTriangle( vertices_1[6],vertices_1[7],vertices_1[8],NumTimesToSubdivide);
    divideTriangle( vertices_1[9],vertices_1[10],vertices_1[11],NumTimesToSubdivide);

            //  Load shaders and initialize attribute buffers

            program = initShaders( gl, "vertex-shader", "fragment-shader" );
            gl.useProgram( program );

            gl.program = program;
            // Load the data into the GPU

            bufferId = gl.createBuffer();
            gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
            gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

            // Associate out shader variables with our data buffer

            a_Position = gl.getAttribLocation( program, "a_Position" );
            gl.vertexAttribPointer( a_Position, 2, gl.FLOAT, false, 0, 0 );
            gl.enableVertexAttribArray( a_Position );

            // creating a buffer for color
    
            var colorBuffer = gl.createBuffer();
            if (!colorBuffer){ console.log('Failed to create the buffer object ');	return -1;}
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

            var a_Color = gl.getAttribLocation(program, "a_Color");
            if (a_Color < 0) { console.log ("Failed to Get Color"); return;	}

            gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(a_Color);

            render(x,y);
    
    
}
// function Triangulated_Pentagon makes five triangles to form a pentagon and then further calls divideTriangle on each of them

function Triangulated_Pentagon(x,y,ShapeSize,NumTimesToSubdivide){
    
    vertices_1 = getPolygon_2(ShapeSize,5);
    
    points = [];
    colors = [];
    

    divideTriangle( vertices_1[0], vertices_1[1], vertices_1[2],NumTimesToSubdivide);
    divideTriangle( vertices_1[3],vertices_1[4],vertices_1[5],NumTimesToSubdivide);
    divideTriangle( vertices_1[6],vertices_1[7],vertices_1[8],NumTimesToSubdivide);
    divideTriangle( vertices_1[9],vertices_1[10],vertices_1[11],NumTimesToSubdivide);
    divideTriangle( vertices_1[12],vertices_1[13],vertices_1[14],NumTimesToSubdivide);

            //  Load shaders and initialize attribute buffers

            program = initShaders( gl, "vertex-shader", "fragment-shader" );
            gl.useProgram( program );

            gl.program = program;
            // Load the data into the GPU

            bufferId = gl.createBuffer();
            gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
            gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

            // Associate out shader variables with our data buffer

            a_Position = gl.getAttribLocation( program, "a_Position" );
            gl.vertexAttribPointer( a_Position, 2, gl.FLOAT, false, 0, 0 );
            gl.enableVertexAttribArray( a_Position );

            var colorBuffer = gl.createBuffer();
            if (!colorBuffer){ console.log('Failed to create the buffer object ');	return -1;}
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

            var a_Color = gl.getAttribLocation(program, "a_Color");
            if (a_Color < 0) { console.log ("Failed to Get Color"); return;	}

            gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(a_Color);

            render(x,y);
    
    
}

var FizzyText = function() {                         // function to be used with dat.gui
    
    this.PaintBucket = function() {                                  // if paint bucket was clicked
        
                                                                     // if nothing was selected
        if (bucket == false && trianglulated_square == false && pentagon == false && trianglulated_triangle == false){
            
          $('#selection').fadeOut(300);                              // use jquery and fade out 'Select an option'
          $("#bucketselected").delay(300).fadeIn(300);               // and fade in 'Paint Buckted Selected'
          bucket = true;                                             // make bucket true
            
        }
        
        else if (trianglulated_triangle == true){                    // if triangle was selected
            $('#triangleselected').fadeOut(300);                     // use jquery and fade out 'Triangle Selected'
            $('#bucketselected').delay(300).fadeIn(300);             // and fade in 'Paint Bucket Selected'
            trianglulated_triangle = false;                          // make triangle false
            bucket = true;                                           // and bucket true
        }
        
        else if (trianglulated_square == true){                      // if square was selected
            $('#squareselected').fadeOut(300);                       // use jquery and fade out 'Square Selected'
            $('#bucketselected').delay(300).fadeIn(300);             // and fade in 'Paint Bucket Selected'
            trianglulated_square = false;                            // make square false
            bucket = true;                                           // and bucket true
        }
        
        else if (pentagon == true){                                  // if pentagon was selected
            $('#pentagonselected').fadeOut(300);                     // use jquery and fade out 'Pentagon Selected'
            $('#bucketselected').delay(300).fadeIn(300);             // and fade in 'Paint Bucket Selected'
            pentagon = false;                                        // make pentagon false
            bucket = true;                                           // and bucket true
        }
        
    };
    
    ///////////////////////////////////// All options behave the same way /////////////////////////////////////////////////////////
    
    this.Triangle = function(){
      
        if (bucket == false && trianglulated_square == false && pentagon == false && trianglulated_triangle == false){
        
          $('#selection').fadeOut(300);
          $("#triangleselected").delay(300).fadeIn(300);
          trianglulated_triangle = true;
            
        }
        
        else if (bucket == true){
            $('#bucketselected').fadeOut(300);
            $('#triangleselected').delay(300).fadeIn(300);
            trianglulated_triangle = true;
            bucket = false;
        }
        
        else if (trianglulated_square == true){
            $('#squareselected').fadeOut(300);
            $('#triangleselected').delay(300).fadeIn(300);
            trianglulated_triangle = true;
            trianglulated_square = false;
        }
        
        else if (pentagon == true){
            $('#pentagonselected').fadeOut(300);
            $('#triangleselected').delay(300).fadeIn(300);
            pentagon = false;
            trianglulated_triangle = true;
        }
        
        points = [];
        colors = [];
        
    };
    
    
    this.Square = function(){
      
        if (bucket == false && trianglulated_square == false && pentagon == false && trianglulated_triangle == false){
        
          $('#selection').fadeOut(300);
          $("#squareselected").delay(300).fadeIn(300);
          trianglulated_square = true;
            
        }
        
        else if (bucket == true){
            $('#bucketselected').fadeOut(300);
            $('#squareselected').delay(300).fadeIn(300);
            trianglulated_square = true;
            bucket = false;
        }
        
        else if (trianglulated_triangle == true){
            $('#triangleselected').fadeOut(300);
            $('#squareselected').delay(300).fadeIn(300);
            trianglulated_triangle = false;
            trianglulated_square = true;
        }
        
        else if (pentagon == true){
            $('#pentagonselected').fadeOut(300);
            $('#squareselected').delay(300).fadeIn(300);
            pentagon = false;
            trianglulated_square = true;
        }
        
        points = [];
        colors = [];
        
    };
    
    this.Pentagon = function(){
        
        if (bucket == false && trianglulated_square == false && pentagon == false && trianglulated_triangle == false){
        
          $('#selection').fadeOut(300);
          $("#pentagonselected").delay(300).fadeIn(300);
          pentagon = true;
            
        }
        
        else if (bucket == true){
            $('#bucketselected').fadeOut(300);
            $('#pentagonselected').delay(300).fadeIn(300);
            pentagon = true;
            bucket = false;
        }
        
        else if (trianglulated_square == true){
            $('#squareselected').fadeOut(300);
            $('#pentagonselected').delay(300).fadeIn(300);
            pentagon = true;
            trianglulated_square = false;
        }
        
        else if (trianglulated_triangle == true){
            $('#triangleselected').fadeOut(300);
            $('#pentagonselected').delay(300).fadeIn(300);
            pentagon = true;
            trianglulated_triangle = false;
        }
        
        points = [];
        colors = [];
        
    };
    
  ///////////////////////////////////////////////////////// Shape options end here ///////////////////////////////////////////////////
    
  this.Tessellation = 0;                                // value for amount of tessellation
  this.ShapeSize = 25;                                  // value for shape size
  this.Twist = 0;                                       // value for amount of twist
  this.BucketAlpha = 1.0;                               // value for alpha value of bucket color
  this.BucketColor = [ 100 , 255 , 255 ];               // value for bucket color
    
};

window.onload = function() {                                          // as the window loads
    
 canvas = document.getElementById('webgl');                           // get canvas by id

 gl = canvas.getContext("webgl", {preserveDrawingBuffer:true} );      // get webGL and set preserveDrawingBuffer flag to true
 if (!gl){
		console.log('Failed to find context');
 }
    
  var text = new FizzyText();                                         // create a new function to be used in dat.gui
  var gui = new dat.GUI();                                            // create a new dat.gui interface
    
    gui.add(text,'PaintBucket');                                      // selection for paint bucket
    gui.add(text,'Triangle');                                         // selection for triangle
    gui.add(text,'Square');                                           // selection for square
    gui.add(text,'Pentagon');                                         // selection for pentagon
    var amount_of_twist = gui.add(text,'Twist',0,1000);               // slider for amount of twist
    var amount_of_tessellation = gui.add(text,'Tessellation',0,6).step(1);      // slider for amount of tessellation
    gui.add(text,'ShapeSize',1,50);                                   // slider for shape size
    gui.addColor(text , 'BucketColor');                               // Paint bucket color selector
    gui.add(text, 'BucketAlpha', 0.0, 1.0);                           // Paint bucket color alpha slider
    
    amount_of_twist.onChange(function(angle_){                        // as the slider changes for the twist
       
        angle = angle_;                                               // change the angle used for twist
        
    });
    
    canvas.onmousedown = function(ev) {                              // upon click on canvas call the click function
        click(ev, gl, canvas,text.BucketColor,text.BucketAlpha,text.Tessellation,text.ShapeSize/100,bucket,a_Position,u_FragColor,program);
    };
    
};

function click(ev, gl, canvas,Bucketcolor,Bucketalpha,tessellation,ShapeSize,bucket,a_Position,u_FragColor,program){
        
    var x = (((ev.pageX)/canvas.width)*2) - 1;                       // get x coordinate where the mouse was clicked on canvas
    var y = (((ev.pageY)/canvas.height)*(-2) + 1);                   // get y coordinate where the mouse was clicked on canvas
    
    if (bucket == true){                                             // if bucket was selected
        render_bucket(gl,canvas,Bucketcolor,Bucketalpha);            // call render bucket function
    }
    
    else if (trianglulated_triangle == true){                        // if triangle was selected
        
        TriangulatedTriangle(x,y,ShapeSize,tessellation);            // call the triangulated triangle function
        
    }
    
    else if (trianglulated_square == true){                          // if square was selected
        Triangulated_Square(x,y,ShapeSize,tessellation);             // call the triangulated square function
    }
    
    else if (pentagon == true){                                      // if pentagon was selected
        Triangulated_Pentagon(x,y,ShapeSize,tessellation);           // call the triangulated pentagon function
    }
    
}

function render_bucket(gl,canvas,Bucketcolor,Bucketalpha){ // render bucket function used to clear the screen according to the selected color
    gl.clearColor(Bucketcolor[0]/255, Bucketcolor[1]/255, Bucketcolor[2]/255, Bucketalpha);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

function initTransformations(modelMatrix){                       // initTransformations function applies transformations to shapes
	var transformationMatrix = gl.getUniformLocation(gl.program, 'transformationMatrix');        // get the transformationMatrix from vs
	gl.uniformMatrix4fv(transformationMatrix, false, modelMatrix.elements);                      // set its value
}

function render(x,y)
{
    var modelMatrix = new Matrix4();                              // create a model matrix for applying transformations
    if (trianglulated_square == true){
         modelMatrix.translate(x,y,0.0);
         // translate it to the position where it was clicked
         modelMatrix.rotate(45.0,0.0,0.0,1.0); 
        initTransformations(modelMatrix);                             // apply transformations
    }
    else {
    modelMatrix.translate(x,y,0.0);                               // translate it to the position where it was clicked
    initTransformations(modelMatrix); 
    }// apply transformations
    
    gl.drawArrays(gl.TRIANGLES,0,points.length);                  // draw the shape
    
}