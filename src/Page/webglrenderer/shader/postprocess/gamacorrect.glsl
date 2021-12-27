vec3 gamacorrect(vec3 col){
  return col=pow(col,vec3(1./GAMMA_FACTOR));
}