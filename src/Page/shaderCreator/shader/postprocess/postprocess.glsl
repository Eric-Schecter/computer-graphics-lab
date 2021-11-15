vec3 postEffects(vec3 col,vec2 coord){
  col=pow(col,vec3(1./GAMMA_FACTOR));
  
  //Vignette
  col*=.5+.5*pow(16.*coord.x*coord.y*(1.-coord.x)*(1.-coord.y),.1);
  
  return col;
}