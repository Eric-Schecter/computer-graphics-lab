#define gl_FragColor pc_fragColor
#define PI 3.14159265359
#define GAMMA_FACTOR 2.2
#define epsilon 1e-5
#define saturate(x)clamp(x,0.,1.)
#define LIMIT 1e10
#define ROUGHNESS 1e-3

#define DIFFUSE 0
#define SPECULAR 1
#define TRANSMISSION 2
#define CLEARCOAT 3

#define AirIoR 1.

#define DefaultGeometry Geometry(LIMIT,vec3(0.))