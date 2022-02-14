vec3 diffuseBRDF(vec3 color){
  return color/PI;
}

// vec3 diffuseBRDF(HitInfo res, vec3 Csheen, vec3 NoV, vec3 NoL, vec3 NoH){

  
//   pdf=0.;
//   if(NoL<=0.)
//   return vec3(0.);
  
//   // Diffuse
//   float FL=SchlickFresnel(NoL);
//   float FV=SchlickFresnel(NoV);
//   float FH=SchlickFresnel(dot(L,H));
//   float Fd90=.5+2.*dot(L,H)*dot(L,H)*mat.roughness;
//   float Fd=mix(1.,Fd90,FL)*mix(1.,Fd90,FV);
  
//   // Fake Subsurface TODO: Replace with volumetric scattering
//   float Fss90=dot(L,H)*dot(L,H)*mat.roughness;
//   float Fss=mix(1.,Fss90,FL)*mix(1.,Fss90,FV);
//   float ss=1.25*(Fss*(1./(L.z+V.z)-.5)+.5);
  
//   // Sheen
//   vec3 Fsheen=0.;//FH*mat.sheen*Csheen;
  
//   // pdf=L.z*INV_PI;
//   return(1./PI*res.material.color+Fsheen)*(1.-res.material.metallic)*(1.-res.material.specTrans);
// }