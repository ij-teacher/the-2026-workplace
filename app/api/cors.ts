const allowedOrigin = 'https://ij-teacher.github.io';
export function preflight(request: Request) {
 if(request.headers.get('origin') !== allowedOrigin) return new Response(null,{status:403});
 return new Response(null,{status:204,headers:{'Access-Control-Allow-Origin':allowedOrigin,'Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Vary':'Origin'}});
}
export function withCors(handler: (request: Request)=>Promise<Response>) {
 return async (request: Request) => {
  const response = await handler(request);
  const headers = new Headers(response.headers);
  headers.set('Cache-Control','no-store');
  headers.append('Vary','Origin');
  if(request.headers.get('origin') === allowedOrigin) headers.set('Access-Control-Allow-Origin',allowedOrigin);
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
 };
}
