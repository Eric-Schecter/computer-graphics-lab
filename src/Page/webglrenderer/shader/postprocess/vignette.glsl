vec3 vignette(vec3 col,vec2 coord){
  col*=.5+.5*pow(16.*coord.x*coord.y*(1.-coord.x)*(1.-coord.y),.1);
  return col;
}


