float GeometrySchlickGGX(float NdotV,float k)
{
    float denom=NdotV*(1.-k)+k;
    return NdotV/denom;
}

float GeometrySmith(float NoV,float NoL,float roughness)
{
    float k=pow(roughness+1.,2.)/8.;
    float ggx1=GeometrySchlickGGX(NoV,k);
    float ggx2=GeometrySchlickGGX(NoL,k);
    return ggx1*ggx2;
}