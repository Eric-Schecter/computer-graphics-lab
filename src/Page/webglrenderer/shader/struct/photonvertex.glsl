struct PhotonVertex{
  vec3 pos;
  vec3 emissive;
  vec3 color;
  float pdf;
};

const int PHOTONNUM=4;
PhotonVertex photon[PHOTONNUM];