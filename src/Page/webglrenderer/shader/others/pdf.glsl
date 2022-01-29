float computePdf(vec3 direction,vec3 reflection,vec3 normal,float isSpecular,float roughness){
  vec3 h=normalize(-direction+reflection);
  float NoH=dot(normal,h);
  float pdfDiffuse=dot(reflection,normal)/PI;

  float normalizationFactor=(roughness+1.)/(PI*2.);
  float pdfBlinn=pow(NoH,roughness)*normalizationFactor/(4.*dot(reflection,normal));
  
  return mix(pdfDiffuse,pdfBlinn,isSpecular);
}