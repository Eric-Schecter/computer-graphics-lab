vec3 sampleLightBI(vec3 direction,vec3 position,HitInfo preRes,vec3 normal,float ratioIoR,Weight weight,int eyeIndex,int lightIndex){
    vec3 direct=vec3(0.);
    PhotonVertex p = photon[lightIndex];
    vec3 lightDirection=normalize(p.pos-position);
  
    float dist=distance(position,p.pos);
    float cos1=saturate(dot(-lightDirection,vec3(0.,-1.,0.)));
    float cos2=saturate(dot(lightDirection,preRes.geometry.normal));
    // float area=50.*200.;
    if(lightIndex==0 && cos1==0.){
        return direct;
    }
    float G=p.pdf * cos2;
    if(G==0.){
        return direct;
    }
  
    HitInfo lightRes;
    Ray shadowRay=Ray(position,lightDirection);
    if(!scene(shadowRay,true,lightRes,preRes.id)){
        return direct;
    }
  
    if(lightRes.geometry.dist>(dist-1.)){// todo: change 1 to reasonable value
    
        float bsdfPDF=0.;
        vec3 eval=directLightBSDF(direction,shadowRay.direction,preRes,normal,ratioIoR,bsdfPDF,weight);
    
        float lightPDF=1./G;
        float mis=misWeight(lightPDF,bsdfPDF);
        // float weight;
        // if(eyeIndex==0){
          //   weight =
        // }else if(lightIndex==0){
      
        // }else{
      
        // }
    // if(isPhoton){
        //   direct+=eval;
    // }else{
        //   direct+=eval*lightRes.material.emissive*lightRes.material.color*mis;
    // }
          direct+=eval*p.emissive*p.color*mis;
    }
  
    return direct;
}

vec3 sampleLight(vec3 direction,vec3 position,HitInfo preRes,vec3 normal,float ratioIoR,Weight weight,vec3 lightPos){
  vec3 direct=vec3(0.);
  vec3 lightDirection=normalize(lightPos-position);
  
  float dist=distance(position,lightPos);
  float cos1=saturate(dot(-lightDirection,vec3(0.,-1.,0.)));
  float cos2=saturate(dot(lightDirection,preRes.geometry.normal));
  float area=50.*200.;
  float G=cos1*cos2/(dist*dist);
  if(G==0.){
    return direct;
  }
  
  HitInfo lightRes;
  Ray shadowRay=Ray(position,lightDirection);
  if(!scene(shadowRay,true,lightRes,preRes.id)){
    return direct;
  }
  
  if(lightRes.geometry.dist>(dist-1.)){// todo: change 1 to reasonable value
    float bsdfPDF=0.;
    vec3 eval=directLightBSDF(direction,shadowRay.direction,preRes,normal,ratioIoR,bsdfPDF,weight);
    
    float lightPDF=1./(G*area);
    float mis=misWeight(lightPDF,bsdfPDF);
    direct+=eval*lightRes.material.emissive*lightRes.material.color*mis;
  }
  
  return direct;
}