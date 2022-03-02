vec3 render(Ray ray){
  vec3 col=Background;
  
  HitInfo res;
  if(!scene(ray,false,res,-1)){
    return col;
  }
  if(res.material.emissive!=vec3(0.)){
    return res.material.color;
  }
  
  if(BIDIR==1){
    lightTrace();
  }
  eyeTrace(col,res,ray);
  
  return saturate(col);
}