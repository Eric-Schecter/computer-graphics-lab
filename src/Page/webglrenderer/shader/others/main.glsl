

// float radicalInverse(int base,int i)
// {
  //   float inverse=0.;
  //   float digit=1./float(base);
  //   float radical=digit;
  //   while(i>0)
  //   {
    //     inverse+=digit*mod(float(i),float(base));
    //     digit*=radical;
    
    //     i/=base;
  //   }
  //   return inverse;
// }

// const int primeNumbers[3]=int[3](2,3,5);
// int NthPrimeNumber(int dimension){
  //   return primeNumbers[dimension];
// }

// vec3 getLight(int count){
  //   vec3 p=vec3(0.,200.,0.);
  //   vec3 size=vec3(100.,1.,50.);
  //   int base=2;
  //   float ri=radicalInverse(base,count);
  //   return vec3(
    //     p.x+ri*size.x,
    //     p.y+ri*size.y,
    //     p.z+ri*size.z
  //   )-size/2.;
// }



vec3 render(Ray ray){
  vec3 col=vec3(0.);
  vec3 mask=vec3(1.);
  const int iteration=10;
  HitInfo res;
  if(!scene(ray,res)){
    return col;
  }
  // if(res.material.emissive!=vec3(0.)){
    //   return res.material.emissive;
  // }
  for(int i=0;i<iteration;i++){
    if(russianRoulette(mask,RandomFloat01(rngState))){
      break;
    }
    vec3 direction=ray.direction;
    vec3 position=ray.origin+direction*res.geometry.dist;
    vec3 normal=res.geometry.normal;
    vec3 color=res.material.color;
    vec3 emissive=res.material.emissive;
    float roughness=res.material.roughness;
    float specular=res.material.specular;
    float metallic=res.material.metallic;
    
    if(emissive!=vec3(0.)){
      col+=mask*emissive*color;
      break;
    }
    float isSpecular=(RandomFloat01(rngState)<specular)?1.:0.;
    
    // vec3 directLight=sampleLight(direction,position,roughness,color,metallic,normal,specular,isSpecular);
    // col+=mask*directLight;
    
    ray=generateRay(direction,position,normal,roughness,specular,isSpecular);
    
    if(!scene(ray,res)){
      break;
    }
    
    vec3 indirectLight=sampleBrdf(ray,direction,position,roughness,color,metallic,normal,specular,res,isSpecular);
    mask*=indirectLight;
  }
  return col;
}

void main()
{
  vec3 col;
  int sampleCount=1;
  for(int i=0;i<sampleCount;i++){
    rngState=random(gl_FragCoord.xy,uFrame+i*1000);
    
    vec2 jitter=vec2(RandomFloat01(rngState),RandomFloat01(rngState))-.5f;
    
    vec2 uv=((gl_FragCoord.xy+jitter)*2.-uResolution.xy)/uResolution.y;
    
    vec3 direction=uCamera.viewMatrix*normalize(vec3(uv*uCamera.fov,1.));
    
    Ray ray=Ray(uCamera.position,direction);
    col+=render(ray);
  }
  col/=float(sampleCount);
  
  vec3 lastFrameColor=texture(uPixel,gl_FragCoord.xy/uResolution.xy).rgb;
  col=mix(lastFrameColor,col,1./float(uFrame+1));
  
  gl_FragColor=vec4(col,1.);
}