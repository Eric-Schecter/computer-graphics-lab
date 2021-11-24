#version 300 es

#define gl_FragColor pc_fragColor

precision highp float;
precision highp int;

uniform sampler2D uPixel;
uniform vec2 uResolution;

out highp vec4 pc_fragColor;

void main()
{
    vec2 uv=gl_FragCoord.xy / uResolution.xy;
    gl_FragColor=texture( uPixel, uv );
}