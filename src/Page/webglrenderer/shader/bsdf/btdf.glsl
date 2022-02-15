vec3 BTDF(HitInfo res, float ratioIoR,vec3 l,vec3 h,vec3 v,vec3 n){
  float D=DistributionGGX(abs(dot(n,h)),res.material.roughness);
  float V=GeometrySmith(abs(dot(n,-v)),abs(dot(n,l)),res.material.roughness);
  float F=dielectricFresnel(abs(dot(-v,n)),ratioIoR);
  float denom = dot(l, h) + dot(-v, h)*ratioIoR;
  // vec3 sColor= pow(res.material.color, vec3(0.5));
  float factor=abs(dot(l,h))*abs(dot(-v,h))*ratioIoR*ratioIoR/(denom*denom*abs(dot(n,l))*abs(dot(n,-v)));
  return factor*D*V*(1.-F)*res.material.color;
}