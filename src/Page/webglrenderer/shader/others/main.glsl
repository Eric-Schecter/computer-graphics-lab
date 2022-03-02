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