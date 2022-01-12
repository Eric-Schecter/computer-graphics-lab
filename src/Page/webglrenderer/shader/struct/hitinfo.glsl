struct Material{
  vec3 color;
  vec3 emissive;
  float roughness;
  float specular;
  float metallic;
};

struct Geometry{
  float dist;
  vec3 normal;
};

struct HitInfo{
  Geometry geometry;
  Material material;
};