void cylinderIntersection(Ray r,vec3 p0,vec3 p1,float rad,inout vec4 gInfo,inout ivec4 oInfo,int index)
{
	float r2=rad*rad;
	
	vec3 dp=p1-p0;
	vec3 dpt=dp/dot(dp,dp);
	
	vec3 ao=r.origin-p0;
	vec3 aoxab=cross(ao,dpt);
	vec3 vxab=cross(r.direction,dpt);
	float ab2=dot(dpt,dpt);
	float a=2.*dot(vxab,vxab);
	float ra=1./a;
	float b=2.*dot(vxab,aoxab);
	float c=dot(aoxab,aoxab)-r2*ab2;
	
	float det=b*b-2.*a*c;
	
	if(det<0.){
		return;
	}
	
	det=sqrt(det);
	
	float t0=(-b-det)*ra;
	float t1=(-b+det)*ra;
	if(t0<=0.&&t1<=0.){
		return;
	}
	float t=t0>0.?t0:t1;
	if(!testVisibility(gInfo.w,t)){
		return;
	}
	vec3 ip=r.origin+r.direction*t;
	vec3 lp=ip-p0;
	float ct=dot(lp,dpt);
	if(ct>0.&&ct<1.)
	{
		vec3 normal = (ip-(p0+dp*ct))*(t==t0?1.:-1.);
		gInfo.xyz=normalize(normal);
		gInfo.w=t;
		oInfo.w=CYLINDER;
		oInfo.y=oInfo.x;
		oInfo.z=index;
	}
}