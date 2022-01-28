vec3 getLight(vec3 rnd,vec3 p,vec3 size){
  vec3 range=(rnd*2.-1.)*size;
  return p+range;
}
