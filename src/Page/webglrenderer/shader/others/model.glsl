struct BoxNode
{
  vec4 data0;// corresponds to .x: leftchildID, .y: min.x, .z: min.y, .w: min.z
  vec4 data1;// corresponds to .x: rightchildID .y: max.x, .z: max.y, .w: max.z
};

struct StackData{
  float id;
  float dist;
};

BoxNode getBoxNode(float id){
  float gap=2.;
  float leftchildID=id*gap;
  float rightchildID=leftchildID+1.;
  float size=model.size;
  ivec2 uv0=ivec2(mod(leftchildID,size),floor(leftchildID/size));
  ivec2 uv1=ivec2(mod(rightchildID,size),floor(rightchildID/size));
  vec4 data0=texelFetch(model.aabbTexture,uv0,0);
  vec4 data1=texelFetch(model.aabbTexture,uv1,0);
  return BoxNode(data0,data1);
}

HitInfo modelIntersect(Ray ray,bool isShadowRay,int preID,HitInfo res,int objID){
  float stackID=0.;
  float size=model.size;
  const float MAX_STACK=24.;
  StackData stackData[int(MAX_STACK)];// store branch to be processed
  BoxNode currentNode=getBoxNode(stackID);
  float dist=BoundingBoxIntersect(currentNode.data0.yzw,currentNode.data1.yzw,ray);
  StackData currentStackData=StackData(stackID,dist);
  stackData[0]=currentStackData;
  bool isIntersectInner=false;
  
  StackData smallerStack;
  StackData biggerStack;
  BoxNode smallerNode;
  BoxNode biggerNode;
  
  float u,v,id;
  float t=res.geometry.dist;
  while(true){
    if(currentStackData.dist<t){// when intersected
      if(currentNode.data0.x>=0.){// inner node
        BoxNode leftchild=getBoxNode(currentNode.data0.x);
        BoxNode rightchild=getBoxNode(currentNode.data1.x);
        float distLeftchild=BoundingBoxIntersect(leftchild.data0.yzw,leftchild.data1.yzw,ray);
        float distRightchild=BoundingBoxIntersect(rightchild.data0.yzw,rightchild.data1.yzw,ray);
        StackData stackdataLeft=StackData(currentNode.data0.x,distLeftchild);
        StackData stackdataRight=StackData(currentNode.data1.x,distRightchild);
        
        if(stackdataLeft.dist<stackdataRight.dist){
          smallerStack=stackdataLeft;
          biggerStack=stackdataRight;
          smallerNode=leftchild;
          biggerNode=rightchild;
        }else{
          smallerStack=stackdataRight;
          biggerStack=stackdataLeft;
          smallerNode=rightchild;
          biggerNode=leftchild;
        }
        
        bool isIntersectedBigger=biggerStack.dist<res.geometry.dist;
        bool isIntersectedSmaller=smallerStack.dist<res.geometry.dist;
        if(isIntersectedBigger&&isIntersectedSmaller){
          stackData[int(stackID)]=biggerStack;// store bigger to stack and wait for process
          stackID++;//push
        }
        if(isIntersectedSmaller){
          currentStackData=smallerStack;
          currentNode=smallerNode;
          isIntersectInner=true;
        }else if(isIntersectedBigger){
          currentStackData=biggerStack;
          currentNode=biggerNode;
          isIntersectInner=true;
        }
      }else{// leaf node
        float slotgap=5.;
        float idTemp=(-currentNode.data0.x-1.)*slotgap;
        
        ivec2 uv0=ivec2(mod(idTemp,size),floor(idTemp/size));
        ivec2 uv1=ivec2(mod(idTemp+1.,size),floor((idTemp+1.)/size));
        ivec2 uv2=ivec2(mod(idTemp+2.,size),floor((idTemp+2.)/size));
        
        vec4 v0=texelFetch(model.triangleTexture,uv0,0);
        vec4 v1=texelFetch(model.triangleTexture,uv1,0);
        vec4 v2=texelFetch(model.triangleTexture,uv2,0);
        
        vec3 p1=vec3(v0.xyz);
        vec3 p2=vec3(v0.w,v1.xy);
        vec3 p3=vec3(v1.zw,v2.x);
        
        float uTemp,vTemp;
        float d=triIntersect(ray,p1,p2,p3,uTemp,vTemp);
        if(d<t){
          id=idTemp;
          t=d;
          u=uTemp;
          v=vTemp;
        }
      }
    }
    
    if(isIntersectInner==false){// when not intersected
      stackID--;// pop
      if(stackID<0.){
        break;
      }
      
      currentStackData=stackData[int(stackID)];
      currentNode=getBoxNode(currentStackData.id);
    }
    isIntersectInner=false;
  }
  if(t<res.geometry.dist){
    ivec2 uv2=ivec2(mod(id+2.,size),floor((id+2.)/size));
    ivec2 uv3=ivec2(mod(id+3.,size),floor((id+3.)/size));
    ivec2 uv4=ivec2(mod(id+4.,size),floor((id+4.)/size));
    vec4 v2=texelFetch(model.triangleTexture,uv2,0);
    vec4 v3=texelFetch(model.triangleTexture,uv3,0);
    vec4 v4=texelFetch(model.triangleTexture,uv4,0);
    vec3 n1=vec3(v2.yzw);
    vec3 n2=vec3(v3.xyz);
    vec3 n3=vec3(v3.w,v4.xy);
    float w=1.-u-v;
    vec3 n=normalize(w*n1+u*n2+v*n3);
    res =HitInfo(Geometry(t,n),DefaultMaterial,objID);
    // res=opUnion(res,HitInfo(Geometry(t,n),DefaultMaterial,objID),isShadowRay,preID);
  }
  return res;
}