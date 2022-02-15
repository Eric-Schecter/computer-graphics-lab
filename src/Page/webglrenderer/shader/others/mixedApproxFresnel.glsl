float mixedApproxFresnel(vec3 direction,HitInfo res, float ratioIoR,vec3 normal1){
  float NoV=abs(dot(direction,res.geometry.normal));
  float df=DielectricFresnel(NoV,ratioIoR);
  float f0=mix(.04,1.,res.material.metallic);
  float sf=schlickFresnel(NoV,f0);
  return mix(df,sf,res.material.metallic);
}
