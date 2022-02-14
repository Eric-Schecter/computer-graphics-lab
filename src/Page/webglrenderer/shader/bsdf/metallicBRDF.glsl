float metallicBRDF(HitInfo res,vec3 n,vec3 v,vec3 l,vec3 h){
  float roughness = res.material.roughness;
  float f0=mix(.04,1.,res.material.metallic);
  float D=DistributionGGX(dot(n,h),roughness);
  float V=GeometrySmith(dot(n,-v),dot(n,l),roughness);
  float F=schlickFresnel(dot(v,h),f0);
  float denominator=4.*dot(n,-v)*dot(n,l);
  return D*V*F/denominator;
}
