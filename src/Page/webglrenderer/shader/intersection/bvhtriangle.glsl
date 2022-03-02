float BVHTriIntersect(Ray r,vec3 v0,vec3 v1,vec3 v2,out float u,out float v)
{  
  vec3 v1v0=v1-v0;
  vec3 v2v0=v2-v0;
  vec3 rov0=r.origin-v0;
  vec3 n=cross(v1v0,v2v0);
  vec3 q=cross(rov0,r.direction);
  float d=1./dot(r.direction,n);
  u=d*dot(-q,v2v0);
  v=d*dot(q,v1v0);
  float t=d*dot(-n,rov0);
  // if(u<0.||v<0.||(u+v)>1.){
  //   return LIMIT;
  // }
  if(t<=0.){
    return LIMIT;
  }
  return t;
}