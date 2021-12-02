#version 300 es

precision highp float;
precision highp int;

in vec2 aPosition;

void main(){
  gl_Position=vec4(vec3(aPosition,0.),1.);
}
