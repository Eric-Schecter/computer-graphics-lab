vec3 render(Ray ray,uint rngState){
    vec3 col = vec3(0.);
    vec3 mask = vec3(1.);
    const int iteration = 5;
    for(int i =0;i<iteration;i++){    
        HitInfo res = scene(ray);
        if(res.material != defaultMaterial){
            vec3 position = ray.origin + ray.direction * res.geometry.dist;
            vec3 normal = res.geometry.normal;
            col+= res.material.emissive * mask;
            mask *= res.material.color;
            vec3 reflection = normalize(res.geometry.normal + RandomUnitVector(rngState));
            ray=Ray(position+epsilon * res.geometry.normal,reflection);
        }else{
            col+=vec3(0.);
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
  const float ratio = 2.;
  vec3 cameraPos = uCameraPos /ratio;
  vec3 lookat = vec3(0.,100.,0.)/ratio;
  float rotation = 0.;

  uint rngState = uint(uint(gl_FragCoord.x) * uint(1973) + uint(gl_FragCoord.y) * uint(9277) + uint(uFrame) * uint(26699)) | uint(1);
  
  vec2 uv=(gl_FragCoord.xy*2.-uResolution.xy)/uResolution.y;
  Camera camera = Camera(cameraPos,lookat,rotation);

  mat3 viewMatrix=setupCamera(camera);
  float fov = 50. / 180. * PI;
  vec3 direction=viewMatrix*normalize(vec3(uv * fov,1.));
  Ray ray=Ray(camera.pos,direction);
  vec3 col=render(ray,rngState);
  vec2 coord=gl_FragCoord.xy/uResolution.xy;
  col=postEffects(col,coord);

  vec3 lastFrameColor = texture(uPixel, gl_FragCoord.xy / uResolution.xy).rgb;
  col = mix(lastFrameColor, col, 1.0 / float(uFrame+1));

  gl_FragColor=vec4(col,1.);
}