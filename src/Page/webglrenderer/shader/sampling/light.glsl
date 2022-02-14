vec3 sampleLight(vec3 direction,vec3 position,HitInfo preRes,vec3 normal1,float ratioIoR,Weight weight){
  vec3 direct=vec3(0.);
  vec3 lightPos=getLight(vec3(RandomFloat01(),RandomFloat01(),RandomFloat01()),vec3(0.,180.,0.),vec3(100.,0,25));
  // vec3 refinePosition=position+preRes.geometry.normal*epsilon;
  vec3 lightDirection=normalize(lightPos-position);
  //float approxFresnel=mixedApproxFresnel(lightDirection,preRes,ratioIoR,normal1);
  
  float dist=distance(position,lightPos);
    // float dist=sqrt(dot(lightPos-refinePosition,lightPos-refinePosition));
  float cos1=saturate(dot(-lightDirection,vec3(0.,-1.,0.)));
  float cos2=saturate(dot(lightDirection,preRes.geometry.normal));
  float area=25.*100.;
  
  float G=cos1*cos2/(dist*dist);
  if(G==0.){
    return direct;
  }
  
  HitInfo res;
  Ray shadowRay=Ray(position+epsilon*lightDirection,lightDirection);
  if(!scene(shadowRay,true,res,preRes.id)){
    return direct;
  }
  // if(res.material.emissive!=vec3(0.)){
    if(res.geometry.dist>(dist-1.)){ // todo: change 1 to reasonable value
      
      float bsdfPDF=0.;
      vec3 eval=directLightBSDF(direction,shadowRay.direction,preRes,normal1,ratioIoR,bsdfPDF,weight);
      
      float lightPDF=1./(area*G);
      float mis=misWeight(lightPDF,bsdfPDF);
      direct+=eval*res.material.emissive*res.material.color*mis;
    }
  // }
  return direct;
}