void sphIntersection(Ray ray,in vec3 ce,float ra,inout vec4 gInfo,inout ivec4 oInfo,int index)
{
  vec3 oc=ray.origin-ce;
  float b=dot(oc,ray.direction);
  float c=dot(oc,oc)-ra*ra;
  float h=b*b-c;
  if(h<0.){// no intersection
    return;
  }
  h=sqrt(h);
  float t1=-b-h;
  float t2=-b+h;
  float dist=t1>0.?t1:t2;
  if(dist<=0.||!testVisibility(gInfo.w,dist)){
    return;
  }
  vec3 hitpoint=ray.origin+dist*ray.direction;
  vec3 normal=normalize(hitpoint-ce);
  
  gInfo.xyz=normal;
  gInfo.w=dist;
  oInfo.w=SPHERE;
  oInfo.y=oInfo.x;
  oInfo.z=index;
}