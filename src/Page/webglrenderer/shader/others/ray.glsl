Ray generateRay(vec3 direction,vec3 position,vec3 normal,int lobe,float IoR){
  vec3 bouncedDirection;
  float dir=1.;
  if(lobe==DIFFUSE){
    bouncedDirection=normalize(normal+RandomUnitVector());
  }else if(lobe==SPECULAR){
    bouncedDirection=normalize(reflect(direction,normal));
  }else if(lobe==TRANSMISSION){
    dir=-1.;
    bouncedDirection=normalize(refract(direction,normal,IoR));
  }else{
    bouncedDirection=normalize(reflect(direction,normal));
  }
  return Ray(position+epsilon*normal*dir,bouncedDirection);
}