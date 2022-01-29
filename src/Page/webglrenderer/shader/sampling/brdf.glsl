vec3 sampleBrdf(Ray ray,HitInfo res,vec3 direction,vec3 position,float roughness,vec3 color,float metallic,vec3 normal,float specular,float isSpecular){
  vec3 col=vec3(0.);
  vec3 eval=brdf(-direction,normal,ray.direction,roughness,color,metallic);
  float pdf=computePdf(direction,ray.direction,normal,isSpecular,roughness);
  float cos1=saturate(dot(-ray.direction,res.geometry.normal));
  float cos2=saturate(dot(ray.direction,normal));
  float area=100.*25.;
  float dist = res.geometry.dist/ratio; // the ratio here to generate bright enough image, which may not be a good choice
  float G=cos1*cos2/(dist*dist);
  if(G!=0.){
    float lightPdf=1./(area*G);
    float mis=misWeight(pdf,lightPdf);
    col+=eval*mis;
  }
  return col;
}