vec3 diffuseBRDF(vec3 color){
  return color/PI;
}

// vec3 diffuseBRDF(HitInfo res, vec3 n,vec3 v,vec3 l,vec3 h){
  
//   // Diffuse
//   float f0=mix(.04,1.,res.material.metallic);
//   float FL=schlickFresnel(dot(n,l),f0);
//   float FV=schlickFresnel(dot(n,-v),f0);
//   float FH=schlickFresnel(dot(l,h),f0);
//   float Fd90=.5+2.*dot(l,h)*dot(l,h)*res.material.roughness;
//   float Fd=mix(1.,Fd90,FL)*mix(1.,Fd90,FV);
  
//   // // Fake Subsurface TODO: Replace with volumetric scattering
//   // float Fss90=dot(L,H)*dot(L,H)*res.material.roughness;
//   // float Fss=mix(1.,Fss90,FL)*mix(1.,Fss90,FV);
//   // float ss=1.25*(Fss*(1./(L.z+V.z)-.5)+.5);
  
//   // // Sheen
//   // vec3 Fsheen=0.;//FH*mat.sheen*Csheen;
  
//   // pdf=L.z*INV_PI;
//   return res.material.color/PI*Fd;
// }