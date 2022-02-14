bool russianRoulette(inout vec3 mask,float rng){
  bool result=false;
  float p=max(mask.r,max(mask.g,mask.b));
  if(rng>p){
    result=true;
  }else{
    mask*=1./p;
  }
  return result;
}