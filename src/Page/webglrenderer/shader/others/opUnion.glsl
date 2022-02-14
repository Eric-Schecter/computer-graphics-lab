HitInfo opUnion(HitInfo s1,HitInfo s2,bool isShadowRay,int preID){
  bool isTransmission = s2.material.specTrans>.5&&isShadowRay;
  bool isTooNear = s2.geometry.dist<epsilon;
  bool isSelfIntersection = s1.geometry.dist<=s2.geometry.dist+epsilon;
  bool isSameObject = preID==s2.id;
  if(isTooNear || isSelfIntersection || isTransmission || isSameObject){
    return s1;
  }
  return s2;
}