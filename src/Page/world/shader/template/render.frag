#version 300 es

#define gl_FragColor pc_fragColor
#define GAMMA_FACTOR 2.2

precision highp float;
precision highp int;

uniform sampler2D uPixel;
uniform vec2 uResolution;

out highp vec4 pc_fragColor;

vec3 ACESFilm(vec3 x)
{
    float a=2.51f;
    float b=.03f;
    float c=2.43f;
    float d=.59f;
    float e=.14f;
    return clamp((x*(a*x+b))/(x*(c*x+d)+e),0.f,1.f);
}

vec3 gamacorrect(vec3 col){
    return col=pow(col,vec3(1./GAMMA_FACTOR));
}

vec3 vignette(vec3 col,vec2 coord){
    col*=.5+.5*pow(16.*coord.x*coord.y*(1.-coord.x)*(1.-coord.y),.1);
    return col;
}

void main()
{
    vec2 uv=gl_FragCoord.xy/uResolution.xy;
    vec3 color=texture(uPixel,uv).rgb;
    color=ACESFilm(color);
    color=gamacorrect(color);
    
    gl_FragColor=vec4(color,1.);
}