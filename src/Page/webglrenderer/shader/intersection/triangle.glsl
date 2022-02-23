//refer to https://iquilezles.org/www/articles/intersectors/intersectors.htm

float triIntersect(Ray r,vec3 v0,vec3 v1,vec3 v2,out float u,out float v)
{
  // vec3 edge1 = v1 - v0;
  // vec3 edge2 = v2 - v0;
  // vec3 pvec = cross(r.direction, edge2);
  // float det = 1.0 / dot(edge1, pvec);
  // vec3 tvec = r.origin - v0;
  // u = dot(tvec, pvec) * det;
  // vec3 qvec = cross(tvec, edge1);
  // v = dot(r.direction, qvec) * det;
  // float t = dot(edge2, qvec) * det;
  // return (det < 0.0 || u < 0.0 || u > 1.0 || v < 0.0 || u + v > 1.0 || t <= 0.0) ? LIMIT : t;
  
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
  return t;
}