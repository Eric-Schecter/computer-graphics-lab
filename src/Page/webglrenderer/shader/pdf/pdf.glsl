//refer to https://www.shadertoy.com/view/sltXRl#

float diffusePDF(vec3 n,vec3 l){
  return saturate(dot(n,l))/PI;
}

float reflectPDF(vec3 v,vec3 n,vec3 l,vec3 h,float roughness){
  float D=DistributionGGX(dot(n,h),roughness);//todo: change to GTR2
  float G1=GeometrySchlickGGX(dot(n,-v),roughness);
  return G1*D*dot(-v,h)/(4.*dot(-v,h)*dot(n,-v));
}

float refractPDF(vec3 v,vec3 n,vec3 l,vec3 h,float roughness,float ratioIoR){
  float D=DistributionGGX(abs(dot(n,h)),roughness);//todo: change to GTR2
  float G1=GeometrySchlickGGX(abs(dot(n,-v)),roughness);
  float denom=dot(l,h)+dot(-v,h)*ratioIoR;
  return G1*D*saturate(dot(-v,h))*abs(dot(l,h))/(abs((dot(n,-v))*denom*denom));
}

float clearcoatPDF(vec3 v,vec3 n,vec3 h,vec3 l,float roughness){
  if(dot(n,l)<=0.){
    return 0.;
  }
  float D=DistributionGGX(abs(dot(n,h)),roughness);//todo: change to GTR1
  return D*dot(n,h)/(4.*dot(v,h));
}

float computePdf(vec3 v,vec3 l,float roughness,int lobe,Weight weight,float ratioIoR,vec3 n){
  float pdf=0.;
  vec3 h=dot(n,v)<0.?normalize(-v+l):-normalize(-v+l*ratioIoR);
  if(lobe==DIFFUSE){
    pdf=diffusePDF(n,l)*weight.diffuse;
  }else if(lobe==SPECULAR){
    pdf=reflectPDF(v,n,l,h,roughness)*weight.reflection;
  }else if(lobe==TRANSMISSION){
    pdf=refractPDF(v,n,l,h,roughness,ratioIoR)*weight.refraction;
  }else{
    pdf=clearcoatPDF(v,n,h,l,roughness)*weight.clearcoat;
  }
  return pdf;
}