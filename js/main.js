window.SS = window.SS || {};
SS.main = SS.main || {};
var enableRotate = 0;
SS.main.main = function() {
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setClearColor(0x000000, 0);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.domElement.setAttribute('id', 'renderer');
	document.body.appendChild(renderer.domElement);

	scene = new THREE.Scene();
	var ratio = renderer.getContext().drawingBufferWidth / renderer.getContext().drawingBufferHeight;
	camera = new THREE.PerspectiveCamera(60, ratio, 0.1, 10000);
	editorCamera = new SS.util.EditorCamera(camera, document, 15, new THREE.Vector2(0, 0));

	SS.util.addResizeListener();
	SS.main.addSceneContent(scene);

	SS.main.render();
}

SS.main.render = function() {
	requestAnimationFrame(SS.main.render);

	time = window.time || new Date().getTime();
	var newTime = new Date().getTime();
	var diff = newTime - time;
	if (enableRotate) {
		// console.log("making frames");
		editorCamera.cameraPos.y += 0;
		editorCamera.cameraPos.x += diff/3000;
		console.log(editorCamera.cameraPos.x);
		editorCamera.cameraPos.z += 0;
		editorCamera.cameraStartPos = editorCamera.cameraPos;
			editorCamera.rotateCamera();
	} else {

	editorCamera.cameraStartPos = editorCamera.cameraPos;
		editorCamera.rotateCamera();
}

	time = newTime;

	renderer.render(scene, camera);
};

SS.main.addSceneContent = function(scene) {
	sunLight = new THREE.PointLight(new THREE.Color(0xffffff), 1.0);
	sunLight.position.set(50, 0, 0);
	scene.add(sunLight);

	scene.add(new SS.planet.Planet(5));

	//scene.add(new SS.starbox.StarBox(4000));
}
