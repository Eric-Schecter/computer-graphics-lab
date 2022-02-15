//refer ro Extending the Disney BRDF to a BSDF with Integrated Subsurface Scattering(2015)
//refer to https://www.shadertoy.com/view/sltXRl

vec3 BSDF(vec3 v,vec3 l,HitInfo res,int lobe,vec3 n,float ratioIoR){
  vec3 h=dot(n,v)<0.?normalize(-v+l):-normalize(-v*ratioIoR+l);
  
  // vec3 n=res.geometry.normal;
  vec3 color=res.material.color;
  float NoL=saturate(dot(n,l));
  
  vec3 bsdf;
  if(lobe==DIFFUSE){
    bsdf=diffuseBRDF(color);
  }else if(lobe==SPECULAR){
    bsdf=metallicBRDF(res,n,v,l,h)*color;
  }else if(lobe==TRANSMISSION){
    bsdf=BTDF(res,ratioIoR,l,h,v,n);
  }else{
    // bsdf=color;
  }
  return bsdf;
}

vec3 directLightBSDF(vec3 v,vec3 l,HitInfo res,vec3 n,float ratioIoR,out float pdf,Weight weight){
  float NoL=dot(n,l);
  vec3 h=NoL>=0.?normalize(-v+l):normalize(-v+l*ratioIoR);
  vec3 color=res.material.color;
  
  vec3 bsdf;
  float bsdfPDF=0.;
  bool isDiffuse=weight.diffuse>0.&&NoL>0.;
  bool isSpecular=weight.reflection>0.&&dot(-v,n)>0.&&NoL>0.;
  bool isTransmission=weight.refraction>0.;
  
  if(isDiffuse){
    bsdf+=diffuseBRDF(color);
    bsdfPDF+=computePdf(v,l,res,DIFFUSE,weight,ratioIoR,n);
  }
  if(isSpecular){
    bsdf+=metallicBRDF(res,n,v,l,h)*color;
    bsdfPDF+=computePdf(v,l,res,SPECULAR,weight,ratioIoR,n);
  }
  if(isTransmission){
    bsdf+=BTDF(res,ratioIoR,l,h,v,n);
    bsdfPDF+=computePdf(v,l,res,TRANSMISSION,weight,ratioIoR,n);
  }
  pdf=bsdfPDF;
  return bsdf;
}