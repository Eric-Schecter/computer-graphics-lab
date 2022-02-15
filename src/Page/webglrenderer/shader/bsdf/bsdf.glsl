//refer ro Extending the Disney BRDF to a BSDF with Integrated Subsurface Scattering(2015)
//refer to https://www.shadertoy.com/view/sltXRl

vec3 BSDF(vec3 v,vec3 l,HitInfo res,int lobe,vec3 n,float ratioIoR){
  vec3 h=dot(n,v)<0.?normalize(-v+l):-normalize(-v*ratioIoR+l);
  
  vec3 color=res.material.color;
  float NoL=saturate(dot(n,l));
  
  vec3 bsdf;
  if(lobe==DIFFUSE){
    bsdf=diffuseBRDF(color);
  }else if(lobe==SPECULAR){
    bsdf=metallicBRDF(res,n,v,l,h)*color;
  }else if(lobe==TRANSMISSION){
    bsdf=BTDF(res.material.roughness,ratioIoR,l,h,v,n)*color;
  }else{
    bsdf=evalClearcoat(res,ratioIoR,l,h,v,n);
  }
  return bsdf;
}

vec3 directLightBSDF(vec3 v,vec3 l,HitInfo res,vec3 n,float ratioIoR,out float pdf,Weight weight){
  float NoL=dot(n,l);
  vec3 h=NoL>=0.?normalize(-v+l):normalize(-v+l*ratioIoR);
  vec3 color=res.material.color;
  float roughness=res.material.roughness;
  
  vec3 bsdf;
  float bsdfPDF=0.;
  bool isDiffuse=weight.diffuse>0.&&NoL>0.;
  bool isSpecular=weight.reflection>0.&&dot(-v,n)>0.&&NoL>0.;
  bool isTransmission=weight.refraction>0.&&NoL<0.;
  bool isClearcoat=weight.clearcoat>0.&&NoL>0.;
  
  if(isDiffuse){
    bsdf+=diffuseBRDF(color);
    bsdfPDF+=diffusePDF(n,l)*weight.diffuse;
  }
  if(isSpecular){
    bsdf+=metallicBRDF(res,n,v,l,h)*color;
    bsdfPDF+=reflectPDF(v,n,l,h,roughness)*weight.reflection;
  }
  if(isTransmission){
    bsdf+=BTDF(roughness,ratioIoR,l,h,v,n)*color;
    bsdfPDF+=refractPDF(v,n,l,h,roughness,ratioIoR)*weight.refraction;
  }
  if(isClearcoat){
    bsdf+=evalClearcoat(res,ratioIoR,l,h,v,n);
    bsdfPDF+=clearcoatPDF(v,n,h,l,roughness)*weight.clearcoat;
  }
  pdf=bsdfPDF;
  return bsdf;
}