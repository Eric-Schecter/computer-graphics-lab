struct SphereGeometry{
  vec3 position;
  float radius;
};

struct Sphere{
  Material material;
  SphereGeometry geometry;
};