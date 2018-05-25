var pointSize = 20;

function increasePointSize() {
	pointSize += 1;

	document.getElementById('pointSizeValue').innerHTML = pointSize;
}

function decreasePointSize() {
	if (pointSize >= 1){
		pointSize -= 1;
	}

	document.getElementById('pointSizeValue').innerHTML = pointSize;

}

function main() {
  	var canvas = document.getElementById('webgl');
	var gl = canvas.getContext("webgl", {preserveDrawingBuffer:true} ); 
	if (!gl){
		console.log('Failed to find context');
	}

	gl.getExtension('GL_OES_standard_derivatives');
    gl.getExtension('OES_standard_derivatives');
	
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram (program);
	gl.program = program;

	var a_Position = gl.getAttribLocation(program, 'a_Position');
	if (a_Position < 0) { 
		console.log ("Failed to Get Position"); 
		return;	
	}
	var u_FragColor = gl.getUniformLocation(program, 'u_FragColor');
	if (u_FragColor < 0) { console.log ("Failed to Get Position"); return;	}

	var a_PointSize = gl.getAttribLocation(program, 'a_PointSize');

	canvas.onmousedown = function(ev) {
        click(ev, gl, canvas, a_Position , u_FragColor, a_PointSize);
    };
}

window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    
    if (key == 38) {
        pointSize += 1;
    }

    else if (key == 40) {

    	if (pointSize == 1){
    		;
    	}

    	else {
        	pointSize -= 1;
    	}
    }
    
    document.getElementById('pointSizeValue').innerHTML = pointSize;
}

function click(ev, gl, canvas, a_Position , u_FragColor, a_PointSize){

	var x = (ev.offsetX / canvas.clientWidth)*2-1;
    var y = ((canvas.clientHeight - ev.offsetY) / canvas.clientHeight)*2-1;
	
	render(gl, a_Position , u_FragColor , x , y, a_PointSize);
}

function render (gl , a_Position , u_FragColor , x , y, a_PointSize){

	gl.vertexAttrib1f(a_PointSize, pointSize);
	gl.vertexAttrib3f(a_Position, x, y, 1.0);
	var r = Math.random();
	var g = Math.random();
	var b = Math.random();
	gl.uniform4f(u_FragColor, r, g, b, 1.0);
	gl.disable(gl.DEPTH_TEST);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);
	gl.drawArrays(gl.Points, 0, 1);
}
