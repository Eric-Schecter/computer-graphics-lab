//refer ro Extending the Disney BRDF to a BSDF with Integrated Subsurface Scattering(2015)
//refer to https://www.shadertoy.com/view/sltXRl

vec3 BSDF(vec3 v,vec3 l,HitInfo res,int lobe,vec3 n1,float ratioIoR){
  vec3 h=normalize(-v+l);
  
  vec3 n=res.geometry.normal;
  vec3 color=res.material.color;
  
  vec3 fr=metallicBRDF(res,n,v,l,h)*color;
  vec3 fd=diffuseBRDF(color);
  
  vec3 bsdf;
  if(lobe==DIFFUSE){
    bsdf=fd;
  }else if(lobe==SPECULAR){
    bsdf=fr;
  }else if(lobe==TRANSMISSION){
    // include two parts, reflect and refract, depends on fresnel
    // bsdf=BTDF(res,ratioIoR,l,h,v,n,n1);
  }else{
    bsdf=color;
  }
  return bsdf*dot(n,l);
}

vec3 directLightBSDF(vec3 v,vec3 l,HitInfo res,vec3 n1,float ratioIoR,out float pdf,Weight weight){
  vec3 h=normalize(-v+l);
  
  vec3 n=res.geometry.normal;
  float NoL=dot(n,l);
  vec3 color=res.material.color;
  
  vec3 fr=metallicBRDF(res,n,v,l,h)*color;
  vec3 fd=diffuseBRDF(color);
  
  vec3 bsdf;
  float bsdfPDF=0.;
  pdf=0.;
  float diffusePDF=(1.-res.material.metallic)*(1.-res.material.specTrans);
  float specularPDF=res.material.metallic;
  bool isDiffuse=diffusePDF>0.&&NoL>0.;
  bool isSpecular=specularPDF>0.&&dot(-v,n)>0.&&NoL>0.;
  bool isTransmission = false;
  
  if(isDiffuse){
    bsdf+=fd;
    bsdfPDF+=computePdf(v,l,res,DIFFUSE,weight);
  }
  if(isSpecular){
    bsdf+=fr;
    bsdfPDF+=computePdf(v,l,res,SPECULAR,weight);
  }
  if(isTransmission){
    //include two parts, reflect and refract, depends on fresnel
    bsdf+=0.;
    bsdf+=1.;//BTDF(res,ratioIoR,l,h,v,n,n1);
  }
  pdf=bsdfPDF;
  return bsdf*NoL;
}