// vec2 opUnion(vec2 s1,vec2 s2){
//   return s1.x<s2.x ? s1 : s2;
// }

HitInfo opUnion(HitInfo s1,HitInfo s2){
    if(s2.geometry.dist<0.){
        return s1;
    }
    if(s1.geometry.dist<s2.geometry.dist){
        return s1;
    }
    return s2;
}