//refer to https://www.shadertoy.com/view/sltXRl

vec3 evalClearcoat(HitInfo res,float ratioIoR,vec3 l,vec3 h,vec3 v,vec3 n){
  if(dot(n,l)<=0.){
    return vec3(0.);
  }
  float magicnumber=.25;
  float D=DistributionGGX(dot(n,h),res.material.clearcoatGloss);
  float G=GeometrySmith(dot(n,-v),dot(n,l),magicnumber);
  float FH=DielectricFresnel(dot(-v,h),ratioIoR);
  float F=mix(.04,1.,FH);
  float denominator=4.*dot(n,-v)*dot(n,l);
  return vec3(magicnumber)*F*D*G*res.material.clearcoat/denominator;
}