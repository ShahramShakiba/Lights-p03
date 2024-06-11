import GUI from 'lil-gui';

export function setupGUI(scene) {
  const gui = new GUI();

  //=== Finding Lights in the Scene based on their "type"
  const ambientLight = scene.children.find((child) => child.isAmbientLight);
  const directionalLight = scene.children.find(
    (child) => child.isDirectionalLight
  );
  const hemisphereLight = scene.children.find(
    (child) => child.isHemisphereLight
  );
  const pointLight = scene.children.find((child) => child.isPointLight);
  const rectAreaLight = scene.children.find((child) => child.isRectAreaLight);
  const spotLight = scene.children.find((child) => child.isSpotLight);

  //============ GUI Folders
  const ambientLights = gui.addFolder('AmbientLight').close();
  const directionalLights = gui.addFolder('DirectionalLight').close();
  const hemisphereLights = gui.addFolder('HemisphereLight').close();
  const pointLights = gui.addFolder('PointLight').close();
  const rectAreaLights = gui.addFolder('RectAreaLight').close();
  const spotLights = gui.addFolder('SpotLight').close();

  //========== AmbientLights
  ambientLights
    .add(ambientLight, 'intensity')
    .min(0)
    .max(1)
    .step(0.001)
    .name('intensity');

  //========== DirectionalLights
  directionalLights
    .add(directionalLight, 'intensity')
    .min(0)
    .max(2)
    .step(0.001)
    .name('intensity');

  //========== HemisphereLights
  hemisphereLights
    .add(hemisphereLight, 'intensity')
    .min(0)
    .max(2)
    .step(0.001)
    .name('intensity');

  //========== PointLights
  pointLights
    .add(pointLight, 'intensity')
    .min(0)
    .max(2)
    .step(0.001)
    .name('intensity');
  pointLights
    .add(pointLight, 'distance')
    .min(0)
    .max(20)
    .step(0.01)
    .name('distance');
  pointLights.add(pointLight, 'decay').min(0).max(5).step(0.01).name('decay');

  //========== RectAreaLights
  rectAreaLights
    .add(rectAreaLight, 'intensity')
    .min(0)
    .max(10)
    .step(0.01)
    .name('intensity');
  rectAreaLights
    .add(rectAreaLight, 'width')
    .min(0)
    .max(10)
    .step(0.001)
    .name('width');
  rectAreaLights
    .add(rectAreaLight, 'height')
    .min(0)
    .max(10)
    .step(0.001)
    .name('height');

  //========== SpotLights
  spotLights
    .add(spotLight, 'intensity')
    .min(0)
    .max(10)
    .step(0.001)
    .name('intensity');
  spotLights
    .add(spotLight, 'distance')
    .min(0)
    .max(15)
    .step(0.001)
    .name('distance');
  spotLights.add(spotLight, 'angle').min(0).max(1).step(0.0001).name('angle');
  spotLights
    .add(spotLight, 'penumbra')
    .min(0)
    .max(2)
    .step(0.0001)
    .name('penumbra');
  spotLights.add(spotLight, 'decay').min(0).max(2).step(0.0001).name('decay');

  return gui;
}
