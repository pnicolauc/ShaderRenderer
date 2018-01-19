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

var renderer, scene;
var camera = new THREE.Camera(  VIEW_ANGLE,
                                ASPECT,
                                NEAR,
                                FAR  );
init();
var startTime = Date.now();
animate();

function init() {

  uniforms = {
  			time: { type: "f", value: 1.0 },
  			resolution: { type: "v2", value: new THREE.Vector2() }
  };
  var container = document.getElementById("renderer");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  renderer = new THREE.WebGLRenderer();
  container.appendChild(renderer.domElement);
  //renderer = new THREE.WebGLRenderer();
	scene = new THREE.Scene();
	// the camera starts at 0,0,0 so pull it back
	camera.position.z = 300;
	// create the sphere's material
	var shaderMaterial = new THREE.MeshShaderMaterial({
    uniforms:       uniforms,
		vertexShader:   vertexshader,
		fragmentShader: document.getElementById("fragmentshader").value
	});
	// create a new mesh with sphere geometry -
	// we will cover the sphereMaterial next!
	var plane = new THREE.Mesh(
	   new THREE.Plane( 250, 250, 32 ),
	   shaderMaterial);

	// add the sphere to the scene
	scene.addChild(plane);

  uniforms.resolution.value.x = 400;
	uniforms.resolution.value.y = 400;

	// draw!
	//renderer.render(scene, camera);

  };

  function animate() {
		requestAnimationFrame( animate );
		render();
	}
	function render() {
		var elapsedMilliseconds = Date.now() - startTime;
		var elapsedSeconds = elapsedMilliseconds / 1000.;
		uniforms.time.value = 60. * elapsedSeconds;
		renderer.render( scene, camera );
	}
