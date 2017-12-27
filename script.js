const vertexshader= "#ifdef GL_ES"
+ "\nprecision highp float;"
+ "\n#endif"
+ "\nvoid main()"
+ "\n{"
+ "\ngl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);"
+ "\n}";

const VIEW_ANGLE = 45,
    ASPECT =1,
    NEAR = 0.1,
    FAR = 10000;
var camera = new THREE.Camera(  VIEW_ANGLE,
                                ASPECT,
                                NEAR,
                                FAR  );
run();

function run() {
  var container = document.getElementById("renderer");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  var renderer = new THREE.WebGLRenderer();
  container.appendChild(renderer.domElement);
  //renderer = new THREE.WebGLRenderer();



	var scene = new THREE.Scene();

	// the camera starts at 0,0,0 so pull it back
	camera.position.z = 300;
	// create the sphere's material
	var shaderMaterial = new THREE.MeshShaderMaterial({
		vertexShader:   vertexshader,
		fragmentShader: document.getElementById("fragmentshader").value
	});

	// set up the sphere vars
	var radius = 50, segments = 16, rings = 16;

	// create a new mesh with sphere geometry -
	// we will cover the sphereMaterial next!
	var plane = new THREE.Mesh(
	   new THREE.Plane( 250, 250, 32 ),
	   shaderMaterial);

	// add the sphere to the scene
	scene.addChild(plane);

	// draw!
	renderer.render(scene, camera);

  };
