varying vec2 vUv;
uniform sampler2D uTexture; // texture
void main()
    {
    // vec4 textureColor = texture2D(uTexture, uVu);
    // vec3 uvColor = vec3(vUv, 1.0);
    // vec3 mixColor = mix(uvColor, textureColor)
    // gl_FragColor = mixColor;

    vec3 blackColor = vec3(0.0);
    float modulation = sin(uTime / 2.0);
    float strength = step(0.9, sin(cnoise(vUv * 10.0) * 20.0 * modulation)) ;
    vec3 uvColor = vec3(vUv, 1.0);
    vec3 mixedColor = mix(blackColor, uvColor, strength) ;
    gl_FragColor = vec4(mixedColor, 1.0);


    }
