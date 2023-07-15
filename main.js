import * as THREE from 'three';
import {Tree} from "./tree"
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import {keyboard} from './keyboard'

//world constants
const GRAVITY=0.00981
const SKYCOLOR = 0x13CFE2
const GROUNDLEVEL = 0
const SECONDS_PER_HOUR = 60*60
const WORLD_SIZE = .5
const PLAYER_SPEED = 4.6/SECONDS_PER_HOUR
const PLAYER_JUMP_POWER = 10/SECONDS_PER_HOUR
const SPRINT_SPEED = 2
const scene = new THREE.Scene();
scene.background = new THREE.Color( SKYCOLOR );
scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

const light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );
const fieldOfView = 75
const renderDistanceFar = 100
const renderDistanceNear = 0.001
const camera = new THREE.PerspectiveCamera( fieldOfView, window.innerWidth / window.innerHeight, renderDistanceNear, renderDistanceFar );
const controls = new PointerLockControls( camera, document.body );
document.body.addEventListener("click",function(){
    controls.lock()
    document.body.removeEventListener("click",this)
})
scene.add( controls.getObject() );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );
const geometry = new THREE.BoxGeometry( WORLD_SIZE, 1, WORLD_SIZE );
const material = new THREE.MeshBasicMaterial( {
        map:new THREE.TextureLoader().load( 'textures/grass.png', function ( texture ) {

            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set( 0, 0 );
            texture.repeat.set( 29,29 );
        
        } )
} );
const cube = new THREE.Mesh( geometry, material );
cube.position.y=GROUNDLEVEL-.55
scene.add( cube );

var tree = new Tree({
    coneMaterial: new THREE.MeshBasicMaterial({
        color: 0x00af00
    })
});
tree.position.x = 0.1
tree.position.y = GROUNDLEVEL-1+.05
console.log(tree)
scene.add(tree);
const spheregeomertry= new THREE.SphereGeometry(.001)
const spherematerial=new THREE.MeshBasicMaterial( { color: 0x0000ff } );
const sphere=new THREE.Mesh(spheregeomertry,spherematerial)
scene.add(sphere)
sphere.position.set(0,0,0)
camera.position.z = 0;
window.sphere = sphere
function movePlayer(){
    if(keyboard['a']){
        controls.moveRight(-PLAYER_SPEED)

    }
    if(keyboard['w'] ==1){
        controls.moveForward(PLAYER_SPEED)
        
    }
    if(keyboard['w'] ==2){
        controls.moveForward(PLAYER_SPEED*SPRINT_SPEED)
        
    }
    if(keyboard['s']){
        controls.moveForward(-PLAYER_SPEED)

    }
    if(keyboard['d']){
        controls.moveRight(PLAYER_SPEED)
    }
    if(keyboard[' '] & canjump){
        velocity.y=PLAYER_JUMP_POWER
        canjump=0
    }
    //sphere.position.set(camera.position.x-.01,camera.position.y,camera.position.z-.01)
}

var velocity={y:0}
var start = performance.now()
var canjump;
function animate() {
	requestAnimationFrame( animate );
    var now=performance.now()
    var delta=(now-start)/1000
    start=now;
    var clutch =GRAVITY*delta
    movePlayer()
    velocity.y-=clutch
    var position=camera.position.y+velocity.y
    if(position<GROUNDLEVEL){
        position=GROUNDLEVEL
        canjump=1
    }
    camera.position.y=position
	renderer.render( scene, camera );
}
var players
player=camera
animate();
