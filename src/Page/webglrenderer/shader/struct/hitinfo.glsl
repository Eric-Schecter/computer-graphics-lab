struct Material{
  vec3 color;
  vec3 emissive;
  float roughness;
  float metallic;
  float specTrans;
  float IoR;
  vec3 specColor;
  float clearcoat;
  float clearcoatGloss;
};

struct Geometry{
  float dist;
  vec3 normal;
};

struct HitInfo{
  Geometry geometry;
  Material material;
  int id;
};