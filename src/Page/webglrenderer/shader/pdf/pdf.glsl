//refer to https://www.shadertoy.com/view/sltXRl#

float diffusePDF(vec3 n,vec3 l){
  return saturate(dot(n,l))/PI;
}

float specularPDF(vec3 v,vec3 n,vec3 l,vec3 h,float roughness){
  float D=DistributionGGX(dot(n,h),roughness);
  float G1=GeometrySchlickGGX(dot(n,-v),roughness);
  return G1*D*dot(-v,h)/(4.*dot(-v,h)*dot(n,-v));
}

float refractPDF(vec3 v,vec3 n,vec3 l,vec3 h,float roughness,float ratioIoR){
  float D=DistributionGGX(abs(dot(n,h)),roughness);
  float G1=GeometrySchlickGGX(abs(dot(n,-v)),roughness);
  float denom=dot(l,h)+dot(-v,h)*ratioIoR;
  return G1*D*saturate(dot(-v,h))*abs(dot(l,h))/(abs((dot(n,-v))*denom*denom));
}

float computePdf(vec3 v,vec3 l,HitInfo res,int lobe,Weight weight,float ratioIoR,vec3 n1){
  vec3 n=res.geometry.normal;
  float pdf=0.;
  vec3 h=dot(n1,v)<0.?normalize(-v+l):-normalize(-v+l*ratioIoR);
  if(lobe==DIFFUSE){
    pdf=diffusePDF(n1,l)*weight.diffuse;
  }else if(lobe==SPECULAR){
    pdf=specularPDF(v,n1,l,h,res.material.roughness)*weight.reflection;
  }else if(lobe==TRANSMISSION){
    pdf=refractPDF(v,n1,l,h,res.material.roughness,ratioIoR)*weight.refraction;
  }else{
    pdf=1.;
  }
  return pdf;
}