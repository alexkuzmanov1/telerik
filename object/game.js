var geometry = new THREE.SphereGeometry( 1, 10, 1  );
 
/*
for(let i = 0;i < geometry.vertices.length;i ++){
    geometry.vertices[i].z = Math.random();
 
*/
 
var texture = new THREE.TextureLoader().load("crate.jpg");
texture.repeat.set(20, 20);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
 
//cube.position.set(8, -8, 8)
//texture.center = new THREE.Vector2(0.5, 0.5);
//texture.rotation = Math.PI / 6;
 
var material = new THREE.MeshPhongMaterial(     {wireframe: true} );
 
var plane = new THREE.Mesh( geometry, material );
scene.add( plane );
 
//var light = new THREE.PointLight( );
//var light2 = new THREE.PointLight( );
//light.position.set(2,2,3);
//light2.position.set(-2, -2, 3);
 
var light = new THREE.AmbientLight();
 
scene.add( light );
//scene.add( light2 );
 
function update() {
   plane.rotation.x += 0.005;
    plane.rotation.y += 0.001;
    plane.rotation.z += 0.005;
}
 
function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
}
function mouseup() {
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
}   