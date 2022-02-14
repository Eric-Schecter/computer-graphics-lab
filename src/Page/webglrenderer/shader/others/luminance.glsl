// transfer from rgb to luminance for compute weight,still don't know why, refer to https://www.shadertoy.com/view/sltXRl
float Luminance(vec3 c)
{
    return 0.212671 * c.x + 0.715160 * c.y + 0.072169 * c.z;
}