export const int2float = (data:number) =>{
  return Number.isInteger(data) ? data.toFixed(1) : data;
}