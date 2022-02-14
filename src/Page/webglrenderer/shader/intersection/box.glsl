Geometry boxIntersection(Ray ray,vec3 p,vec3 size)
{
  mat4 txi=translate(p);
  mat4 txx=inverse(txi);
  vec3 rdd=(txx*vec4(ray.direction,0.)).xyz;
  vec3 roo=(txx*vec4(ray.origin,1.)).xyz;
  vec3 m=1./rdd;
  vec3 n=m*roo;
  vec3 k=abs(m)*size;
  vec3 t1=-n-k;
  vec3 t2=-n+k;
  float tN=max(max(t1.x,t1.y),t1.z);
  float tF=min(min(t2.x,t2.y),t2.z);
  if(tN>tF||tF<=0.||tN<=0.){
    return DefaultGeometry;
  }
  vec3 normal=-sign(ray.direction)*step(t1.yzx,t1.xyz)*step(t1.zxy,t1.xyz);
  normal=normalize((txi*vec4(normal,0.)).xyz);
  return Geometry(tN,normal);
}