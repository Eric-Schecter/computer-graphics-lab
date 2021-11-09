#version 300 es

#define gl_FragColor pc_fragColor

precision highp float;
precision highp int;

out highp vec4 pc_fragColor;

void main()
{   
    gl_FragColor=vec4(1.);
}