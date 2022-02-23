float BoundingBoxIntersect( vec3 minCorner, vec3 maxCorner, Ray ray )
{
	vec3 near = (minCorner - ray.origin) / ray.direction;
	vec3 far  = (maxCorner - ray.origin) / ray.direction;
	
	vec3 tmin = min(near, far);
	vec3 tmax = max(near, far);
	
	float t0 = max( max(tmin.x, tmin.y), tmin.z);
	float t1 = min( min(tmax.x, tmax.y), tmax.z);
	
	return max(t0, 0.0) > t1 ? LIMIT : t0;
}