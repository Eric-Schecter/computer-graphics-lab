int getLobe(Weight weight){
  float r=RandomFloat01();
  int lobe;
  if(r<weight.diffuse){
    lobe=DIFFUSE;
  }else if(r<(weight.diffuse+weight.reflection)){
    lobe=SPECULAR;
  }else if(r<(weight.diffuse+weight.reflection+weight.refraction)){
    lobe=TRANSMISSION;
  }else{
    lobe=CLEARCOAT;
  }
  return lobe;
}

// int getLobe(HitInfo res,float approxFresnel){
  //   float diffuseWt=Luminance(res.material.color)*(1.-res.material.metallic)*(1.-res.material.specTrans);
  //   float specReflectWt=Luminance(mix(res.material.specColor,vec3(1.),approxFresnel));
  //   if(res.material.specTrans==1.){
    //     specReflectWt=0.;
    //     diffuseWt=0.;
  //   }
  //   float specRefractWt=(1.-approxFresnel)*(1.-res.material.metallic)*res.material.specTrans*Luminance(res.material.color);
  //   float clearcoatWt=res.material.clearCoat*(1.-res.material.metallic);
  //   float totalWt=diffuseWt+specReflectWt+specRefractWt+clearcoatWt;
  
  //   diffuseWt/=totalWt;
  //   specReflectWt/=totalWt;
  //   specRefractWt/=totalWt;
  //   clearcoatWt/=totalWt;
  
  //   float r=RandomFloat01();
  //     int lobe;
  //   if(r<diffuseWt){
    //     lobe=DIFFUSE;
  //   }else if(r<(diffuseWt+specReflectWt)){
    //     lobe=SPECULAR;
  //   }else {
    //     lobe=TRANSMISSION;
  //   }
  //   return lobe;
  
  //   // int lobe;
  //   // if(r<diffuseWt){
    //   //   lobe=DIFFUSE;
  //   // }else if(r<(diffuseWt+specReflectWt)){
    //   //   lobe=SPECULAR;
  //   // }else if(r<(diffuseWt+specReflectWt+specRefractWt)){
    //   //   lobe=TRANSMISSION;
  //   // }else{
    //   //   lobe=CLEARCOAT;
  //   // }
  //   // return lobe;
// }
