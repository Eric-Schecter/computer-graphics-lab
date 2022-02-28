bool testVisibility(float s1,float s2){
  bool isTooNear=s2<epsilon;
  bool isSelfIntersection=s1<=s2+epsilon&&s1>=s2-epsilon;
  bool isnotNear=s1<s2;
  return (isTooNear||isSelfIntersection||isnotNear) == false;
}