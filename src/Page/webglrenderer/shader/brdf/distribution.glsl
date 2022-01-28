float DistributionGGX(float NoH, float a)
{
    float a2 = a*a;
    float NoH2 = NoH*NoH;
    float denom  = NoH2 * (a2 - 1.0) + 1.0;
    denom        = PI * denom * denom;
    return max(a2 / denom,0.); // bug when roughness set to 0 for speclar case, set limit bigger than 0 solve the problem, still don't know the reason
}