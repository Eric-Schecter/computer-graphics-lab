float diffusePDF(vec3 n,vec3 l){
  return dot(n,l)/PI;
}

float specularPDF(vec3 v,vec3 n,vec3 l,vec3 h,float roughness){
  float D=DistributionGGX(dot(n,h),roughness);
  float G1=GeometrySchlickGGX(dot(n,-v),roughness);
  return G1*D*dot(-v,h)/(4.*dot(-v,h)*dot(n,-v));
}

float computePdf(vec3 v,vec3 l,HitInfo res,int lobe,Weight weight){
  vec3 n=res.geometry.normal;
  if(dot(n,l)<=0.){
    return 0.;
  }
  float pdf=0.;
  vec3 h=normalize(-v+l);
  if(lobe==DIFFUSE){
    pdf=diffusePDF(n,l)*weight.diffuse;
  }else if(lobe==SPECULAR){
    pdf=specularPDF(v,n,l,h,res.material.roughness)*weight.reflection;
  }else if(lobe==TRANSMISSION){
    pdf=0.;
  }
  return pdf;
}