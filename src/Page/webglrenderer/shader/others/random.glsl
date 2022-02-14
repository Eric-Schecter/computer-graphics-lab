uint rngState;

uint wang_hash(inout uint seed)
{
    seed=uint(seed^uint(61))^uint(seed>>uint(16));
    seed*=uint(9);
    seed=seed^(seed>>4);
    seed*=uint(0x27d4eb2d);
    seed=seed^(seed>>15);
    return seed;
}

float RandomFloat01()
{
    uint seed = rngState+=uint(1000);
    return float(wang_hash(seed))/4294967296.;
}

vec3 RandomUnitVector()
{
    float z=RandomFloat01()*2.f-1.f;
    float a=RandomFloat01()*2.*PI;
    float r=sqrt(1.f-z*z);
    float x=r*cos(a);
    float y=r*sin(a);
    return vec3(x,y,z);
}

uint random(vec2 uv,int seed){
    return uint(uint(uv.x)*uint(1973)+uint(uv.y)*uint(9277)+uint(seed)*uint(26699))|uint(1);
}