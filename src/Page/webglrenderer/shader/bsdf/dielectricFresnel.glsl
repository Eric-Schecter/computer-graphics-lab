//refer to pbrt v3 https://pbr-book.org/3ed-2018/Reflection_Models/Specular_Reflection_and_Transmission
//ignore Dispersion, polarization

// void swap(inout float eta1,inout float eta2){
  //   float temp=eta2;
  //   eta2=eta1;
  //   eta1=temp;
// }

// float dielectricFresnel(float cosThetaI,float etaI,float etaT,out float ratioIoR){
  //   cosThetaI=clamp(cosThetaI,-1.,1.);
  //   // Potentially swap indices of refraction
  //   bool entering=cosThetaI<=0.;
  //   if(!entering){
    //     swap(etaI,etaT);
    //     cosThetaI=abs(cosThetaI);
  //   }
  
  //   // Compute _cosThetaT_ using Snell's law
  //   ratioIoR = etaI/etaT;
  //   float sinThetaI=sqrt(max(0.,1.-cosThetaI*cosThetaI));
  //   float sinThetaT=ratioIoR*sinThetaI;
  
  //   // Handle total internal reflection
  //   if(sinThetaT>=1.){
    //     return 1.;
  //   }
  
  //   float cosThetaT=sqrt(max(0.,1.-sinThetaT*sinThetaT));
  //   float Rparl=((etaT*cosThetaI)-(etaI*cosThetaT))/((etaT*cosThetaI)+(etaI*cosThetaT));
  //   float Rperp=((etaI*cosThetaI)-(etaT*cosThetaT))/((etaI*cosThetaI)+(etaT*cosThetaT));
  //   return saturate((Rparl*Rparl+Rperp*Rperp)/2.);
// }

float dielectricFresnel(float cosThetaI,float eta){
  float sinThetaTSq=eta*eta*(1.-cosThetaI*cosThetaI);
  
  // Total internal reflection
  if(sinThetaTSq>1.){
    return 1.;
  }
  
  float cosThetaT=sqrt(max(1.-sinThetaTSq,0.));
  
  float rs=(eta*cosThetaT-cosThetaI)/(eta*cosThetaT+cosThetaI);
  float rp=(eta*cosThetaI-cosThetaT)/(eta*cosThetaI+cosThetaT);
  
  return 0.5*(rs*rs+rp*rp);
}