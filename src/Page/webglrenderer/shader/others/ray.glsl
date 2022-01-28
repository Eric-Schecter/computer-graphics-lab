Ray generateRay(vec3 direction,vec3 position,vec3 normal,float roughness,float specular,float isSpecular){
  vec3 diffuseReflection=normalize(normal+RandomUnitVector(rngState));
  vec3 specularReflection=reflect(direction,normal);
  specularReflection=normalize(mix(specularReflection,diffuseReflection,roughness));
  vec3 reflection=mix(diffuseReflection,specularReflection,isSpecular);
  return Ray(position+epsilon*normal,reflection);
}