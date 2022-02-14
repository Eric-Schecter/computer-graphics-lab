float schlickFresnel(float cosTheta, float F0)
{
    return F0 + (1. - F0) * pow(1.0 - cosTheta, 5.0);
} 