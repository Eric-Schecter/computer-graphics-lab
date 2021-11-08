vec3 spotLight(vec3 viewDirection,vec3 lightDirection){
  return vec3(1e2)*pow(abs(dot(viewDirection,lightDirection)),250.);
}