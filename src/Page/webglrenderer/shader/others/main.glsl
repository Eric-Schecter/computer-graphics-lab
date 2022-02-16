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
  const int iteration=5;
  HitInfo res;
  HitInfo preRes;
  if(!scene(ray,false,res,-1)){
    return col;
  }
  if(res.material.emissive!=vec3(0.)){
    return res.material.color;
  }
  for(int i=0;i<iteration;i++){
    if(russianRoulette(mask,RandomFloat01())){
      break;
    }
    
    preRes=res;
    vec3 direction=ray.direction;
    vec3 position=ray.origin+direction*preRes.geometry.dist;
    
    bool entering=dot(preRes.geometry.normal,direction)<0.;
    vec3 normal=preRes.geometry.normal*(entering?1.:-1.);
    float ior = 2. / (1. - sqrt(0.08 * preRes.material.specular)) - 1.;
    float ratioIoR=entering?(AirIoR/ior):(ior/AirIoR);
    
    //lobe->direction-> 1.bsdf 2.pdf
    //refer to https://graphics.pixar.com/library/PxrMaterialsCourse2017/paper.pdf
    
    float approxFresnel=mixedApproxFresnel(direction,preRes,ratioIoR,normal);
    
    Weight weight=getWeight(preRes,approxFresnel);
    
    int lobe=getLobe(weight);
    
    if(lobe!=TRANSMISSION){
      vec3 directLight=sampleLight(direction,position,preRes,normal,ratioIoR,weight);
      col+=mask*directLight;
    }
    
    ray=generateRay(direction,position,normal,lobe,ratioIoR);
    
    if(!scene(ray,false,res,preRes.id)){
      break;
    }
    
    float pdf=computePdf(direction,ray.direction,preRes.material.roughness,lobe,weight,ratioIoR,normal);
    vec3 eval=BSDF(direction,ray.direction,preRes,lobe,normal,ratioIoR);
    if(pdf==0.){
      break;
    }
    // vec3 indirectLight=eval/pdf;
    // vec3 indirectLight=sampleBSDF(direction,ray.direction,res,preRes,position,lobe,normal1,ratioIoR,weight,pdf);
    mask*=eval/pdf;
    
    // mis refer to https://www.shadertoy.com/view/4lfcDr
    if(res.material.emissive!=vec3(0.)){
      float cos1=saturate(dot(ray.direction,preRes.geometry.normal));
      float cos2=saturate(dot(-ray.direction,vec3(0.,-1.,0.)));
      float dist=res.geometry.dist;
      float G=cos1*cos2/(dist*dist);
      if(G==0.){
        break;
      }
      float lightArea=50.*200.;
      float lightPDF=1./(lightArea*G);
      float mis=misWeight(pdf,lightPDF);
      col+=mask*res.material.emissive*res.material.color*mis;
      break;
    }
    
  }
  return col;
}

void main()
{
  vec3 col;
  int sampleCount=1;
  for(int i=0;i<sampleCount;i++){
    rngState=random(gl_FragCoord.xy,uFrame+i*1000);
    
    vec2 jitter=vec2(RandomFloat01(),RandomFloat01())-.5f;
    
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