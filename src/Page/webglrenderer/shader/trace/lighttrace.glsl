void lightTrace(){
  vec3 lightPos=getLight(vec3(RandomFloat01(),RandomFloat01(),RandomFloat01()),vec3(0.,180.,0.),vec3(100.,.01,25.));
  vec3 normal=vec3(0.,-1.,0.);//todo: generate from light geometry
  vec3 direction=vec3(0.);
  Ray ray;
  HitInfo res;
  HitInfo preRes;
  vec3 mask=vec3(1.);
  float ratioIoR=1.;
  int lobe=DIFFUSE;
  const float area=50.*200.;
  float pdf;
  float dist = 1.;
  for(int i=0;i<PHOTONNUM;i++){
    preRes=res;
    if(russianRoulette(mask,RandomFloat01())){
        break;
    }
    if(i!=0){
      lightPos=ray.origin;
      normal=res.geometry.normal;
      direction=ray.direction;
      dist = distance(lightPos,lightPos+direction*res.geometry.dist);
    }
    ray=generateRay(direction,lightPos+normal,normal,lobe,ratioIoR);//todo: finetune parameters
    if(!scene(ray,false,res,-1)){
      break;
    }
    if(i!=0){
      float approxFresnel=mixedApproxFresnel(direction,preRes,ratioIoR,normal);
      Weight weight=getWeight(preRes,approxFresnel);
      pdf=computePdf(direction,ray.direction,preRes.material.roughness,lobe,weight,ratioIoR,normal)/(dist*dist);
    }
    
    // vec3 eval=BSDF(direction,ray.direction,preRes,lobe,normal,ratioIoR);
    // if(pdf==0.){
      //     break;
    // }
    
    photon[i].pos=lightPos+ray.direction*res.geometry.dist;
    photon[i].emissive=vec3(10.);
    photon[i].color=vec3(1.);
    photon[i].pdf=i>0?pdf*photon[i-1].pdf:area;
    
    // mask*=eval;
  }
}