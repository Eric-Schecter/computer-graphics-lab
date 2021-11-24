Geometry sphIntersection(Ray ray,in vec3 ce,float ra)
{
  vec3 oc=ray.origin-ce;
  float b=dot(oc,ray.direction);
  float c=dot(oc,oc)-ra*ra;
  float h=b*b-c;
  if(h<0.){
    return Geometry(-1.,vec3(0.));
  }
  h=sqrt(h);
  float dist=-b-h;
  vec3 hitpoint=ray.origin+dist*ray.direction;
  vec3 normal=hitpoint-ce;
  return Geometry(dist,normal);
}