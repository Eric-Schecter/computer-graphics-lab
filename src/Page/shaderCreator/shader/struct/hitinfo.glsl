struct Material{
  vec3 color;
  vec3 emissive;
};

struct Geometry{
  float dist;
  vec3 normal;
};

struct HitInfo{
  Geometry geometry;
  Material material;
};

Material defaultMaterial = Material(vec3(0.),vec3(0.));