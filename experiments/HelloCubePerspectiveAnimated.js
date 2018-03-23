//Computing Modal View Matrix in CPU. Stack also implemented

var rotate_z = 0.5;
var rotate_x = 0.5;
var rotate_y = 0.5;

var speed = 10;
var size = 1.0;
var moveX = 0;
var moveY = 0;
var moveZ = 0;
var timePrev = Date.now();

function animate(currentangle, time, elapsed){
	time = Date.now();
	elapsed = time - timePrev;
	timePrev = time;

	return (currentangle + (elapsed * (speed/100)));
}

var FizzyText = function(){
    
    this.Speed = 10;
    this.Size = 1.0;
    this.MoveX = 0.0;
    this.MoveY = 0.0;
    this.MoveZ = 0.0;
    
}

function main() {
  	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	if (!gl){
		console.log('Failed to find context');
	}
    
    var text = new FizzyText();                                                  // get the function to be used in dat.gui
    var gui = new dat.GUI(); 
    var speedfunction = gui.add(text,'Speed',1,50);
    var sizefunction = gui.add(text,'Size',0.5,2.0);
    var moveXfunction = gui.add(text,'MoveX',-1.0,1.0);
    var moveYfunction = gui.add(text,'MoveY',-1.0,1.0);
    var moveZfunction = gui.add(text,'MoveZ',-1.0,1.0);
    
    speedfunction.onChange(function(speed_){
       
        speed = speed_;
        
    });
    
    sizefunction.onChange(function(size_){
       
        size = size_;
        
    });
    
    moveXfunction.onChange(function(moveX_){
       
        moveX = moveX_;
        
    });
    
    moveYfunction.onChange(function(moveY_){
       
        moveY = moveY_;
        
    });
    
    moveZfunction.onChange(function(moveZ_){
       
        moveZ = moveZ_;
        
    });
	
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram (program);
	gl.program = program;
	
	var numberOfVertices = initVertexBuffers(gl);
    
	gl.enable(gl.DEPTH_TEST);
	var vMatrix = mat4.create();
	var pMatrix = mat4.create();
	// no neeed to create mvMatrix as it is already created in modelViewMatrixStack.js
	
	mat4.identity(vMatrix);
    mat4.perspective(pMatrix, 30 , 1 , 1 , 100);
	mat4.lookAt(vMatrix, [3, 3, 2],[ 0, 0, 0],[ 0, 1, 0]);
	//mat4.lookAt(vMatrix, [0.0, 0.0, -1.0], [0.0, 0.0, 1.0], [0.0, 1.0, 0.0]);
	
	initProjection(gl, pMatrix)
    
	render(gl, numberOfVertices, vMatrix);
}

function initProjection(gl, pMatrix){
	var u_pMatrix = gl.getUniformLocation(gl.program, 'u_pMatrix');
	if (!u_pMatrix) { 
    	console.log('Failed to get the storage locations of proj');
    	return;
  	}
	gl.uniformMatrix4fv(u_pMatrix, false, flatten(pMatrix));
}

function initMVMatrix(gl, mvMatrix, vMatrix){
	// The order of mv is important. Toggle the commenting of following lines and that of lookAT call to see.
	mat4.multiply(mvMatrix, vMatrix, mvMatrix);
	//mat4.multiply(mvMatrix, mvMatrix, vMatrix);
	var u_mvMatrix = gl.getUniformLocation(gl.program, 'u_mvMatrix');
	gl.uniformMatrix4fv(u_mvMatrix, false, flatten(mvMatrix));	

}

function convert_to_radians(angle){
    return angle*Math.PI/180;
}

function render (gl, numberOfVertices, vMatrix){
    
    var current_angle = 0.0;
    var time;
    var elapsed;
    
    var tick = function(){
        
    current_angle = animate(current_angle,time,elapsed);
    
	gl.clearColor(0.12, 0.12, 0.12, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.identity(mvMatrix);
    
    //mat4.rotateZ(mvMatrix, mvMatrix, convert_to_radians(current_angle));
    
    mat4.rotateY(mvMatrix, mvMatrix, convert_to_radians(current_angle));
   
    mat4.rotateX(mvMatrix, mvMatrix, convert_to_radians(current_angle));
    
    mat4.scale(mvMatrix,mvMatrix,[size,size,size]);
    
    mat4.translate(mvMatrix,mvMatrix,[moveX,moveY,moveZ]);
     
    
    initMVMatrix(gl, mvMatrix,  vMatrix);
	gl.drawElements(gl.TRIANGLES, numberOfVertices, gl.UNSIGNED_BYTE, 0);
    requestAnimationFrame(tick);
        
    }
    
    tick();
}

function initVertexBuffers(gl) {
  // Create a cube
  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3

  var vertices = new Float32Array([   // Vertex coordinates
     size, size, size,  -size, size, size,  -size,-size, size,   size,-size, size,  // v0-v1-v2-v3 front
     size, size, size,   size,-size, size,   size,-size,-size,   size, size,-size,  // v0-v3-v4-v5 right
     size, size, size,   size, size,-size,  -size, size,-size,  -size, size, size,  // v0-v5-v6-v1 up
    -size, size, size,  -size, size,-size,  -size,-size,-size,  -size,-size, size,  // v1-v6-v7-v2 left
    -size,-size,-size,   size,-size,-size,   size,-size, size,  -size,-size, size,  // v7-v4-v3-v2 down
     size,-size,-size,  -size,-size,-size,  -size, size,-size,   size, size,-size   // v4-v7-v6-v5 back
  ]);

  var colors = new Float32Array([     // Colors
    0.4, 0.45, 1.0,  0.4, 0.45, 1.0,  0.4, 0.45, 1.0,  0.4, 0.45, 1.0,  // v0-v1-v2-v3 front(blue)
    0.74, 1.0, 0.4,  0.74, 1.0, 0.4,  0.74, 1.0, 0.4,  0.74, 1.0, 0.4,  // v0-v3-v4-v5 right(green)
    0.0, 0.4, 0.4,  0.0, 0.4, 0.4,  0.0, 0.4, 0.4,  0.0, 0.4, 0.4,  // v0-v5-v6-v1 up(red)
    1.0, 1.0, 0.54,  1.0, 1.0, 0.54,  1.0, 1.0, 0.54,  1.0, 1.0, 0.54,  // v1-v6-v7-v2 left
    0.25, 1.0, 1.0,  0.25, 1.0, 1.0,  0.25, 1.0, 1.0,  0.25, 1.0, 1.0,  // v7-v4-v3-v2 down
    0.64, 1.0, 1.0,  0.64, 1.0, 1.0,  0.64, 1.0, 1.0,  0.64, 1.0, 1.0   // v4-v7-v6-v5 back
  ]);

  var indices = new Uint8Array([       // Indices of the vertices
     0, 1, 2,   0, 2, 3,    // front
     4, 5, 6,   4, 6, 7,    // right
     8, 9,10,   8,10,11,    // up
    12,13,14,  12,14,15,    // left
    16,17,18,  16,18,19,    // down
    20,21,22,  20,22,23     // back
  ]);

  // Create a buffer object
  var indexBuffer = gl.createBuffer();
  if (!indexBuffer) 
    return -1;

  // Write the vertex coordinates and color to the buffer object
  if (!initArrayBuffer(gl, vertices, 3, gl.FLOAT, 'a_Position'))
    return -1;

  if (!initArrayBuffer(gl, colors, 3, gl.FLOAT, 'a_Color'))
    return -1;

  // Write the indices to the buffer object
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}

function initArrayBuffer(gl, data, num, type, attribute) {
  var buffer = gl.createBuffer();   // Create a buffer object
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  // Write date into the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  // Assign the buffer object to the attribute variable
  var a_attribute = gl.getAttribLocation(gl.program, attribute);
  if (a_attribute < 0) {
    console.log('Failed to get the storage location of ' + attribute);
    return false;
  }
  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  // Enable the assignment of the buffer object to the attribute variable
  gl.enableVertexAttribArray(a_attribute);

  return true;
}
