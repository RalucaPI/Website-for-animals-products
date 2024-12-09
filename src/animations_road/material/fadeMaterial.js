// Function to replace the fragment shader with modifications
const replaceFragmentShader = (fragmentShader) => {
  console.log("Original Fragment Shader:", fragmentShader);

  if (!fragmentShader.includes("#include <common>")) {
    console.error("Shader missing #include <common>. Aborting replacement.");
    return fragmentShader; // Return unchanged shader
  }

  if (!fragmentShader.includes("vec4 diffuseColor = vec4( diffuse, opacity );")) {
    console.error(
      "Shader missing vec4 diffuseColor = vec4( diffuse, opacity ). Aborting replacement."
    );
    return fragmentShader; // Return unchanged shader
  }

  // Perform replacements
  const modifiedShader = fragmentShader
    .replace(
      `#include <common>`,
      `#include <common>
      float exponentialEasing(float x, float a) {
        float epsilon = 0.00001;
        float min_param_a = 0.0 + epsilon;
        float max_param_a = 1.0 - epsilon;
        a = max(min_param_a, min(max_param_a, a));
        if (a < 0.5) {
          a = 2.0 * a;
          return pow(x, a);
        } else {
          a = 2.0 * (a - 0.5);
          return pow(x, 1.0 / (1.0 - a));
        }
      }`
    )
    .replace(
      `vec4 diffuseColor = vec4( diffuse, opacity );`,
      `
      float fadeDist = 350.0;
      float dist = length(vViewPosition);
      float fadeOpacity = smoothstep(fadeDist, 0.0, dist);
      fadeOpacity = exponentialEasing(fadeOpacity, 0.93);
      vec4 diffuseColor = vec4(diffuse, fadeOpacity * opacity);`
    );

  console.log("Modified Fragment Shader:", modifiedShader);
  return modifiedShader;
};

// Function to apply fade effect to shaders
export const fadeOnBeforeCompile = (shader) => {
  if (!shader.fragmentShader) {
    console.error("Shader does not contain fragmentShader. Aborting.");
    return;
  }

  shader.fragmentShader = replaceFragmentShader(shader.fragmentShader);
};

// Function for flat shaders
export const fadeOnBeforeCompileFlat = (shader) => {
  if (!shader.fragmentShader) {
    console.error("Shader does not contain fragmentShader. Aborting.");
    return;
  }

  shader.fragmentShader = replaceFragmentShader(shader.fragmentShader).replace(
    `#include <output_fragment>`,
    `gl_FragColor = diffuseColor;`
  );
};
