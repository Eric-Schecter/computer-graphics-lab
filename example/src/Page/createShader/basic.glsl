vec3 calcNormal(in vec3 pos)
{
  vec2 e=vec2(1.,-1.)*.5773*.0005;
  return normalize(e.xyy*scene(pos+e.xyy).x+
  e.yyx*scene(pos+e.yyx).x+
  e.yxy*scene(pos+e.yxy).x+
  e.xxx*scene(pos+e.xxx).x);
}

Shape rayMarching(Ray ray){
  const float maxDist=100.;
  const int iteration=1000;
  
  float distance=0.;
  float material=0.;
  
  for(int i=0;i<iteration;i++){
      vec3 p=ray.origin+ray.direction*distance;
      vec2 res=scene(p);
      if(res.x<epsilon){
          break;
      }
      if(distance>maxDist){
          material=0.;
          break;
      }
      distance+=res.x;
      material=res.y;
  }
  return Shape(distance,materials[int(material)]);
}

vec3 render(Ray ray){
  Light light=Light(vec3(1.),normalize(vec3(1.,.75,-1.)));
  vec3 col=vec3(0.);
  vec3 mask=vec3(1.);
  vec3 ambient=vec3(1.);
  const int iteration=3;
  for(int i=0;i<iteration;i++){
      Shape res=rayMarching(ray);
      vec3 position=ray.origin+ray.direction*res.x;
      vec3 normal=calcNormal(position);
      if(res.y!=materials[0]){
          vec3 view=-ray.direction;
          float nov=saturate(dot(normal,view));
          float nol=saturate(dot(normal,light.direction));
          vec3 f0=res.y.color*res.y.specular;
          vec3 fresnel=F_Schlick(f0,nov);
          mask*=fresnel;
          
          if(rayMarching(Ray(position+epsilon*light.direction,light.direction)).y==materials[0]){
              col+=nol*light.color
              *res.y.color*res.y.diffuse
              *(1.-fresnel)*mask/fresnel;
          }
          
          vec3 reflection=reflect(ray.direction,normal);
          ray=Ray(position+epsilon*reflection,reflection);
          
      }else{
          vec3 spotlight=spotLight(ray.direction,light.direction);
          col+=mask*(ambient+spotlight);
          break;
      }
  }
  
  return col;
}

mat3 setupCamera(Camera camera){
  vec3 forward=normalize(camera.lookat-camera.pos);
  vec3 orientation=vec3(sin(camera.rotation),cos(camera.rotation),0.);
  vec3 left=normalize(cross(forward,orientation));
  vec3 up=normalize(cross(left,forward));
  return mat3(left,up,forward);
}

void main()
{
  vec2 uv=(gl_FragCoord.xy*2.-uResolution.xy)/uResolution.y;
  Camera camera = Camera(vec3(sin(uTime) * 2.,1., cos(uTime) * 2.),vec3(0.,1.,0.),0.);
  mat3 viewMatrix=setupCamera(camera);
  vec3 direction=viewMatrix*normalize(vec3(uv,1.));
  Ray ray=Ray(camera.pos,direction);
  vec3 col=render(ray);
  vec2 coord=gl_FragCoord.xy/uResolution.xy;
  col=postEffects(col,coord);
  gl_FragColor=vec4(col,1.);
}