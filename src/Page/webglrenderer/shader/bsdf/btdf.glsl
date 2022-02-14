float GTR2(float NDotH, float a)
{
    float a2 = a * a;
    float t = 1.0 + (a2 - 1.0) * NDotH * NDotH;
    return a2 / (PI * t * t);
}

vec3 BTDF(HitInfo res, float ratioIoR,vec3 l,vec3 h,vec3 v,vec3 n,vec3 n1){
  return res.material.color;
  float D=DistributionGGX(dot(n,h),res.material.roughness);
  float V=GeometrySmith(abs(dot(n,h)),abs(dot(n,l)),res.material.roughness);
  float F=dielectricFresnel(abs(dot(v,n)),ratioIoR);
  float denom = dot(l, h) + dot(v, h);
  float factor=abs(dot(l,h))*abs(dot(v,h))*ratioIoR*ratioIoR/(denom*denom*abs(dot(n,l))*abs(dot(n,v)));
  return factor*D*V*(1.-F)*res.material.color;
}