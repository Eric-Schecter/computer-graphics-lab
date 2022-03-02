struct CylinderGeometry{
  vec3 top;
  vec3 bottom;
  float radius;
};

struct Cylinder{
  Material material;
  CylinderGeometry geometry;
};