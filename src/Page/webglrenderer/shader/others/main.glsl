uint rngState;

float radicalInverse(int base,int i)
{
  float inverse=0.;
  float digit=1./float(base);
  float radical=digit;
  while(i>0)
  {
    inverse+=digit*mod(float(i),float(base));
    digit*=radical;
    
    i/=base;
  }
  return inverse;
}

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

vec3 getLight(vec3 rnd){
  vec3 p=vec3(0.,200.,0.);
  vec3 size=vec3(100.,1.,50.);
  vec3 range=(rnd*2.-1.)*size;
  int base=2;
  return p+range;
}

Ray generateRay(vec3 direction,vec3 position,vec3 normal,float roughness,float specular){
  vec3 diffuseReflection=normalize(normal+RandomUnitVector(rngState));
  vec3 specularReflection=reflect(direction,normal);
  specularReflection=normalize(mix(specularReflection,diffuseReflection,roughness));
  vec3 reflection=RandomFloat01(rngState)<specular?specularReflection:diffuseReflection;
  return Ray(position+epsilon*normal,reflection);
}

vec3 brdf(vec3 direction,float roughness,vec3 color,float metallic,vec3 normal,vec3 l,vec3 lightColor){
  vec3 v=normalize(direction);
  vec3 n=normalize(normal);
  vec3 h=normalize(v+l);
  vec3 r=normalize(reflect(direction,n));
  
  float NoV=saturate(dot(n,v));
  float NoL=saturate(dot(n,l));
  float NoH=saturate(dot(n,h));
  float LoH=saturate(dot(l,h));
  float VoH=saturate(dot(v,h));
  
  vec3 f0=mix(vec3(.04),color,metallic);
  
  float D=DistributionGGX(n,h,roughness);
  float V=GeometrySmith(n,v,l,roughness);
  vec3 F=fresnelSchlick(VoH,f0);
  float denominator=4.*NoV*NoL+.0001;
  vec3 fr=D*V*F/denominator;
  vec3 ks=F;
  vec3 kd=vec3(1.)-ks;
  kd*=1.-metallic;
  return(kd*color/PI+fr)*lightColor*NoL;
}

vec3 misWeight(vec3 a,vec3 b){
  vec3 a2=a*a;
  vec3 b2=b*b;
  vec3 a2b2=a2+b2;
  return a2/a2b2;
}

vec3 getDirectLight(vec3 direction,vec3 position,float roughness,vec3 color,float metallic,vec3 normal){
  vec3 direct=vec3(0.);
  const int lightCount=1;
  for(int j=0;j<lightCount;j++){
    vec3 light=normalize(getLight(RandomUnitVector(rngState))-position);
    HitInfo res;
    if(scene(Ray(position,light),res)){
      vec3 lightColor=res.material.emissive;
      float dist=res.geometry.dist;
      if(lightColor!=vec3(0.)&&dist>epsilon){
        vec3 a=brdf(direction,roughness,color,metallic,normal,light,lightColor);
        float cosTheta=saturate(dot(-light,res.geometry.normal));
        float area=100.*50.;
        float G=cosTheta*area/(dist*dist);
        direct+=lightColor*G;
        // direct+=misWeight(lightColor*G,a);
      }
    }
  }
  direct/=float(lightCount);
  return direct;
}

vec3 render(Ray ray){
  vec3 col=vec3(0.);
  vec3 mask=vec3(1.);
  const int iteration=10;
  HitInfo res;
  for(int i=0;i<iteration;i++){
    // if(russianRoulette(i,mask,RandomFloat01(rngState))){
      //     break;
    // }
    
    if(!scene(ray,res)){
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
      col+=mask*color*emissive;
      break;
    }
    
    vec3 direct=getDirectLight(direction,position,roughness,color,metallic,normal);
    
    col+=color*direct;
    mask*=color*direct;
    
    ray=generateRay(direction,position,normal,roughness,specular);
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
  // col=mix(lastFrameColor,col,0.5);
  
  gl_FragColor=vec4(col,1.);
}