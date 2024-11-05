import {HttpInterceptorFn} from "@angular/common/http";

export const bearerInterceptor: HttpInterceptorFn = (req, next) => {
  const paths = ['/authe','/services'];

  if (paths.some(path => req.url.includes(path))) {
    return next(req);
  }

 const token : string|null = localStorage.getItem('token');
  let reqUrl = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + token)
  });
  return next(reqUrl);
};

