vec3 sampleLight(vec3 direction,vec3 position,HitInfo preRes,vec3 normal,float ratioIoR,Weight weight){
  vec3 direct=vec3(0.);
  vec3 lightPos=getLight(vec3(RandomFloat01(),RandomFloat01(),RandomFloat01()),vec3(0.,180.,0.),vec3(100.,0.,25.));
  vec3 lightDirection=normalize(lightPos-position);
  //float approxFresnel=mixedApproxFresnel(lightDirection,preRes,ratioIoR,normal);
  
  float dist=distance(position,lightPos);
  // float dist=sqrt(dot(lightPos-refinePosition,lightPos-refinePosition));
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
    
    float lightPDF=1./(area*G);
    float mis=misWeight(lightPDF,bsdfPDF);
    direct+=eval*lightRes.material.emissive*lightRes.material.color*mis;
  }
  
  return direct;
}