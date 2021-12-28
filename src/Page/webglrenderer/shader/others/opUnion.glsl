HitInfo opUnion(HitInfo s1,HitInfo s2){
    if(s2.geometry.dist<0.){
        return s1;
    }
    if(s1.geometry.dist<s2.geometry.dist){
        return s1;
    }
    return s2;
}