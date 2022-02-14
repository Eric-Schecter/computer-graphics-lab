float DistributionGGX(float NoH, float a)
{
    float a2 = a*a;
    float NoH2 = NoH*NoH;
    float denom  = NoH2 * (a2 - 1.0) + 1.0;
    denom        = PI * denom * denom;
    return a2 / denom;
}