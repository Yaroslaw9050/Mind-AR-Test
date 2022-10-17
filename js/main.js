import {loadGLTF} from './libs/loader.js';
const THREE = window.MINDAR.FACE.THREE;


document.addEventListener('DOMContentLoaded', function() {
    const start = async() =>
    {
        const mindarThree = new window.MINDAR.FACE.MindARThree
        (
            {
                container: document.body
            }
        );
        const {renderer, scene, camera} = mindarThree;
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        scene.add( directionalLight );

        const geometry = new THREE.SphereGeometry(0.005, 32, 16);
        const material = new THREE.MeshBasicMaterial
        (
            {
                color: 0x00ffff,
                transparent: true,
                opacity: 0.5
            }
        );
        const sphare = new THREE.Mesh( geometry, material );
        
        
        const glasses = await loadGLTF('./glasses2/scene.gltf');
        glasses.scene.scale.multiplyScalar(0.75);
        glasses.scene.position.y = -0.05;
        glasses.scene.renderOrder = 1;
        sphare.renderOrder = 2;
        
        //
        // for(let i = 0; i < 428; i++)
        // {
        //     mindarThree.addAnchor(i).group.add(new THREE.Mesh( geometry, material ));
        //     console.log(i);
        // }

        const anchor = mindarThree.addAnchor(168);
        anchor.group.add(glasses.scene);

        await mindarThree.start();
        renderer.setAnimationLoop(() => 
        {
            renderer.render(scene,camera);
        });
    }
    start();
});