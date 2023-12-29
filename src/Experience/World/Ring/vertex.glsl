uniform sampler2D uTexture;
varying vec2 vUv;

main(){
  // // Model position
  // vec4 modelPosition = modelMatrix * vec4(viewPosition * 1.0);

  // // View Position
  // vec4 viewPosition = viewMatrix * modelPosition;

  // //Projected Position
  // vec4 projectedPosition = projectionMatrix * viewPosition;

  // gl_Position = projectedPosition;

  // vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
};
