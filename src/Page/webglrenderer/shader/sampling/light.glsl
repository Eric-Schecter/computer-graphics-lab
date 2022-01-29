vec3 sampleLight(vec3 direction,vec3 position,float roughness,vec3 color,float metallic,vec3 normal,float specular,float isSpecular){
  vec3 direct=vec3(0.);
  const int lightCount=1;
  for(int j=0;j<lightCount;j++){
    vec3 lightDirection=normalize(getLight(RandomUnitVector(rngState),vec3(0.,200.,0.),vec3(100.,.0,25.))-position);
    vec3 lightColor=vec3(1.,.9,.7);
    HitInfo res;
    Ray shadowRay=Ray(position,lightDirection);
    if(scene(shadowRay,res)){
      vec3 emissive=res.material.emissive;
      if(emissive!=vec3(0.)){
        float dist=res.geometry.dist/ratio;
        vec3 eval=brdf(-direction,normal,lightDirection,roughness,color,metallic);
        
        float brdfPdf=computePdf(direction,shadowRay.direction,normal,isSpecular,roughness);
        
        // float cos1=saturate(dot(-lightDirection,res.geometry.normal));
        float cos1=saturate(dot(-lightDirection,vec3(0.,-1.,0.)));
        float cos2=saturate(dot(lightDirection,normal));
        float area=25.*100.;
        
        float G=cos1*cos2/(dist*dist);
        if(G!=0.){
          float lightPdf=1./(area*G);
          float mis=misWeight(lightPdf,brdfPdf);
          direct+=eval*lightColor*mis;
        }
      }
    }
  }
  direct/=float(lightCount);
  return direct;
}