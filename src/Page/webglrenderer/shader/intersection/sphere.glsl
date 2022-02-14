Geometry sphIntersection(Ray ray,in vec3 ce,float ra)
{
  vec3 oc=ray.origin-ce;
  float b=dot(oc,ray.direction);
  float c=dot(oc,oc)-ra*ra;
  float h=b*b-c;
  if(h<0.){
    return DefaultGeometry;
  }
  h=sqrt(h);
  float t1=-b-h;
  float t2=-b+h;
  float dist=t1>0.?t1:t2;
  // dist= t2; // temp
  if(dist<=0.){
    return DefaultGeometry;
  }
  vec3 hitpoint=ray.origin+dist*ray.direction;
  vec3 normal=normalize(hitpoint-ce);
  return Geometry(dist,normal);
}

// void solveQuadratic(float A, float B, float C, out float t0, out float t1)
// {
  // 	float invA = 1.0 / A;
  // 	B *= invA;
  // 	C *= invA;
  // 	float neg_halfB = -B * 0.5;
  // 	float u2 = neg_halfB * neg_halfB - C;
  // 	float u = u2 < 0.0 ? neg_halfB = 0.0 : sqrt(u2);
  // 	t0 = neg_halfB - u;
  // 	t1 = neg_halfB + u;
// }

// Geometry sphIntersection(Ray ray,in vec3 pos,float rad)
// {
  
  //   	float t0, t1;
  // 	vec3 L = ray.origin - pos;
  // 	float a = dot( ray.direction, ray.direction );
  // 	float b = 2.0 * dot( ray.direction, L );
  // 	float c = dot( L, L ) - (rad * rad);
  // 	solveQuadratic(a, b, c, t0, t1);
  //   	float dist = t0 > 0.0 ? t0 : t1 > 0.0 ? t1 : 0.;
  //     if(dist==0.){
    //       return Geometry(-1.,vec3(0.));
  //     }
  //   vec3 hitpoint=ray.origin+dist*ray.direction;
  //   vec3 normal=normalize(hitpoint-pos);
  //   return Geometry(dist,normal);
// }