void eyeTrace(inout vec3 col,HitInfo res,Ray ray){
  vec3 mask=vec3(1.);
  HitInfo preRes;
  const int iteration=4;
  for(int i=0;i<iteration;i++){
    if(russianRoulette(mask,RandomFloat01())){
      break;
    }
    
    preRes=res;
    vec3 direction=ray.direction;
    vec3 position=ray.origin+direction*preRes.geometry.dist;
    
    bool entering=dot(preRes.geometry.normal,direction)<0.;
    vec3 normal=preRes.geometry.normal*(entering?1.:-1.);
    float ior=2./(1.-sqrt(.08*preRes.material.specular))-1.;
    float ratioIoR=entering?(AirIoR/ior):(ior/AirIoR);
    
    //lobe->direction-> 1.bsdf 2.pdf
    //refer to https://graphics.pixar.com/library/PxrMaterialsCourse2017/paper.pdf
    
    float approxFresnel=mixedApproxFresnel(direction,preRes,ratioIoR,normal);
    
    Weight weight=getWeight(preRes,approxFresnel);
    
    int lobe=getLobe(weight);
    
    if(lobe==DIFFUSE){
      if(BIDIR==1){
        int index=int(RandomFloat01()*float(PHOTONNUM));
        if(photon[index].emissive!=vec3(0.)){
          vec3 photonLight=sampleLightBI(direction,position,preRes,normal,ratioIoR,weight,i,index);
          col+=mask*photonLight;
        }
      }else{
        vec3 mainLightPos=getLight(vec3(RandomFloat01(),RandomFloat01(),RandomFloat01()),vec3(0.,180.,0.),vec3(100.,.01,25.));
        vec3 directLight=sampleLight(direction,position,preRes,normal,ratioIoR,weight,mainLightPos);
        col+=mask*directLight;
      }
    }
    
    ray=generateRay(direction,position,normal,lobe,ratioIoR);
    
    if(!scene(ray,false,res,preRes.id)){
      break;
    }
    
    float pdf=computePdf(direction,ray.direction,preRes.material.roughness,lobe,weight,ratioIoR,normal);
    vec3 eval=BSDF(direction,ray.direction,preRes,lobe,normal,ratioIoR);
    if(pdf==0.){
      break;
    }
    // vec3 indirectLight=eval/pdf;
    // vec3 indirectLight=sampleBSDF(direction,ray.direction,res,preRes,position,lobe,normal1,ratioIoR,weight,pdf);
    mask*=eval/pdf;
    
    // mis refer to https://www.shadertoy.com/view/4lfcDr
    // if(res.material.emissive!=vec3(0.)){
      //   float cos1=saturate(dot(ray.direction,preRes.geometry.normal));
      //   // float cos2=saturate(dot(-ray.direction,vec3(0.,-1.,0.)));
      //   float dist=res.geometry.dist;
      //   float G=cos1*photon[0].pdf;
      //   if(G==0.){
        //     break;
      //   }
      //   // float lightArea=50.*200.;
      //   // float lightPDF=1./(lightArea*G);
      //   float lightPDF = 1./G;
      //   float mis=misWeight(pdf,lightPDF);
      //   // col+=mask*res.material.emissive*res.material.color*mis;
      //   break;
    // }
    
    if(BIDIR!=1){// cancel for now
      if(res.material.emissive!=vec3(0.)){
        float cos1=saturate(dot(ray.direction,preRes.geometry.normal));
        float cos2=saturate(dot(-ray.direction,vec3(0.,-1.,0.)));
        float dist=res.geometry.dist;
        float G=cos1*cos2/(dist*dist);
        if(G==0.){
          break;
        }
        float lightArea=50.*200.;
        float lightPDF=1./(lightArea*G);
        float mis=misWeight(pdf,lightPDF);
        col+=mask*res.material.emissive*res.material.color*mis;
        break;
      }
    }
  }
}