/**
 * Shader de l'océan du hero : houle procédurale (somme de sinusoïdes),
 * dégradé turquoise → lagon profond, reflet de ciel en fresnel,
 * glint doré du soleil couchant et fondu vers l'horizon.
 */

export const oceanVertex = /* glsl */ `
  uniform float uTime;
  uniform float uWaveAmp;

  varying vec3 vWorldPos;
  varying vec3 vNormalW;
  varying vec2 vUv;

  // Hauteur de houle : plusieurs trains de vagues qui se croisent
  float waveH(vec2 p) {
    float h = 0.0;
    h += sin(p.x * 0.32 + uTime * 0.85) * 0.45;
    h += sin(p.x * 0.20 + p.y * 0.26 + uTime * 0.55) * 0.32;
    h += sin(p.y * 0.48 - uTime * 1.05) * 0.20;
    h += sin((p.x - p.y) * 0.85 + uTime * 1.6) * 0.07;
    return h * uWaveAmp;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    float h = waveH(pos.xy);
    pos.z += h;

    // Normale par différences finies (champ de hauteur local z-up)
    float e = 0.55;
    float hx = waveH(pos.xy + vec2(e, 0.0));
    float hy = waveH(pos.xy + vec2(0.0, e));
    vec3 n = normalize(vec3(h - hx, h - hy, e));
    vNormalW = normalize(mat3(modelMatrix) * n);

    vec4 wp = modelMatrix * vec4(pos, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

export const oceanFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uDeep;
  uniform vec3 uShallow;
  uniform vec3 uSky;
  uniform vec3 uHorizon;
  uniform vec3 uSunColor;
  uniform vec3 uSunDir;

  varying vec3 vWorldPos;
  varying vec3 vNormalW;
  varying vec2 vUv;

  void main() {
    vec3 N = normalize(vNormalW);
    vec3 V = normalize(cameraPosition - vWorldPos);

    // Eau translucide au premier plan, lagon profond au large
    float depthMix = smoothstep(0.05, 0.85, vUv.y);
    vec3 col = mix(uShallow, uDeep, depthMix);

    // Faux caustics : moirures lumineuses qui dérivent
    float sh = sin(vWorldPos.x * 2.1 + uTime * 1.15) * sin(vWorldPos.z * 2.3 - uTime * 0.85);
    sh += sin(vWorldPos.x * 3.6 - uTime * 0.65) * sin(vWorldPos.z * 3.1 + uTime * 1.35);
    col += uShallow * smoothstep(0.55, 1.0, sh * 0.5 + 0.5) * 0.10 * (1.0 - depthMix);

    // Reflet du ciel en incidence rasante (fresnel)
    float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
    col = mix(col, uSky, fres * 0.55);

    // Glint doré : spéculaire serré dans l'axe du soleil couchant
    vec3 H = normalize(uSunDir + V);
    float spec = pow(max(dot(N, H), 0.0), 140.0);
    col += uSunColor * spec * 1.15;

    // Fondu vers l'horizon pour rejoindre le dégradé CSS du ciel
    float dist = length(vWorldPos - cameraPosition);
    col = mix(col, uHorizon, smoothstep(38.0, 68.0, dist));

    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;
