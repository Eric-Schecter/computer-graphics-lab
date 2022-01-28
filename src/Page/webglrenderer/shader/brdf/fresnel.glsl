vec3 fresnelSchlick(float cosTheta, vec3 F0)
{
    return F0 + (vec3(1.) - F0) * pow(saturate(1.0 - cosTheta), 5.0);
} 