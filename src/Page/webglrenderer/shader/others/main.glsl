vec3 render(Ray ray,uint rngState){

  vec3 col=vec3(0.);
  vec3 mask=vec3(1.);
  const int iteration=5;
  for(int i=0;i<iteration;i++){
    HitInfo res=scene(ray);
    if(res.material!=defaultMaterial){
      vec3 position=ray.origin+ray.direction*res.geometry.dist;
      vec3 normal=res.geometry.normal;
      col+=res.material.emissive*mask;
      mask*=res.material.color;
      vec3 diffuseReflection=normalize(normal+RandomUnitVector(rngState));
      vec3 specularReflection=reflect(ray.direction,normal);
      specularReflection=normalize(mix(specularReflection,diffuseReflection,res.material.roughness));
      vec3 reflection=(RandomFloat01(rngState)<res.material.specular)?specularReflection:diffuseReflection;
      ray=Ray(position+epsilon*res.geometry.normal,reflection);
      
      // russian roulette
      float p=max(mask.r,max(mask.g,mask.b));
      if(RandomFloat01(rngState)>p){
        break;
      }
      mask*=1./p;

    }else{
      col+=vec3(0.);
      break;
    }
  }
  return col;
}

mat3 setupCamera(Camera camera){
  vec3 forward=normalize(camera.lookat-camera.position);
  vec3 orientation=vec3(sin(camera.rotation),cos(camera.rotation),0.);
  vec3 left=normalize(cross(forward,orientation));
  vec3 up=normalize(cross(left,forward));
  return mat3(left,up,forward);
}

void main()
{
  vec3 col;
  int sampleCount=2;
  for(int i=0;i<sampleCount;i++){
    uint rngState=uint(uint(gl_FragCoord.x)*uint(1973)+uint(gl_FragCoord.y)*uint(9277)+uint(uFrame + i * 1000)*uint(26699))|uint(1);
    
    // AA
    vec2 jitter=vec2(RandomFloat01(rngState),RandomFloat01(rngState))-.5f;
    
    vec2 uv=((gl_FragCoord.xy+jitter)*2.-uResolution.xy)/uResolution.y;
    
    mat3 viewMatrix=setupCamera(uCamera);
    
    vec3 direction=viewMatrix*normalize(vec3(uv*uCamera.fov,1.));
    
    Ray ray=Ray(uCamera.position,direction);
    col+=render(ray,rngState);
  }
  col/=float(sampleCount);

  vec3 lastFrameColor=texture(uPixel,gl_FragCoord.xy/uResolution.xy).rgb;
  col=mix(lastFrameColor,col,1./float(uFrame+1));
  
  gl_FragColor=vec4(col,1.);
}