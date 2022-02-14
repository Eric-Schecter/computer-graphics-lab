vec3 sampleBSDF(vec3 v,vec3 l,HitInfo res,HitInfo preRes,vec3 position,int lobe,vec3 normal1,float ratioIoR,Weight weight,out float pdf){
  vec3 eval=BSDF(v,l,preRes,lobe,normal1,ratioIoR);
  pdf=computePdf(v,l,preRes,lobe,weight);
  return pdf==0. ? vec3(0.) : eval/pdf;
}