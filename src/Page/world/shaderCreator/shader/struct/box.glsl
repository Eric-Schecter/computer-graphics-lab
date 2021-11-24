struct BoxGeometry{
  vec3 position;
  vec3 size;
};

struct Box{
  Material material;
  BoxGeometry geometry;
};