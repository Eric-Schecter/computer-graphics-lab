bool russianRoulette(int i,out vec3 ratio,float rng){
  int result=0;
  float p=max(ratio.r,max(ratio.g,ratio.b));
  if(rng>p){
    result=1;
  }else{
    ratio*=1./p;
  }
  return result==1;
}