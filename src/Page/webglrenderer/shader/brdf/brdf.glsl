vec3 specularBrdf(vec3 color,float metallic,float roughness,float LoH,float NoV,float NoL,float NoH,out vec3 ks){
  vec3 f0=mix(vec3(.04),color,metallic);
  float r2=roughness*roughness;
  float D=DistributionGGX(NoH,r2);
  float V=GeometrySmith(NoV,NoL,roughness);
  vec3 F=fresnelSchlick(LoH,f0);
  ks=F;
  float denominator=4.*NoV*NoL+.0001;
  return D*V*F/denominator;
}

vec3 diffuseBrdf(float metallic,vec3 color,vec3 ks){
  vec3 kd=vec3(1.)-ks;
  kd*=1.-metallic;
  return kd*color/PI;
}

vec3 brdf(vec3 v,vec3 n,vec3 l,float roughness,vec3 color,float metallic,float isSpecular){
  vec3 h=normalize(v+l);
  
  float NoV=saturate(dot(n,v));
  float NoL=saturate(dot(n,l));
  float NoH=saturate(dot(n,h));
  float LoH=saturate(dot(l,h));
  
  vec3 ks;
  vec3 fr=specularBrdf(color,metallic,roughness,LoH,NoV,NoL,NoH,ks)*color;
  vec3 fd=diffuseBrdf(metallic,color,ks);
  // return mix(fd,fr,isSpecular)*NoL;
  return(fd+fr)*NoL;
}