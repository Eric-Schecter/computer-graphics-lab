float BTDF(float roughness, float ratioIoR,vec3 l,vec3 h,vec3 v,vec3 n){
  float D=DistributionGGX(abs(dot(n,h)),roughness);
  float G=GeometrySmith(abs(dot(n,-v)),abs(dot(n,l)),roughness);
  float F=DielectricFresnel(abs(dot(-v,n)),ratioIoR);
  float denom = dot(l, h) + dot(-v, h)*ratioIoR;
  float factor=abs(dot(l,h))*abs(dot(-v,h))*ratioIoR*ratioIoR/(denom*denom*abs(dot(n,l))*abs(dot(n,-v)));
  return factor*D*G*(1.-F);
}