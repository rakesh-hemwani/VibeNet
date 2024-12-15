import { convexAuthNextjsMiddleware,
createRouteMatcher,
isAuthenticatedNextjs,
nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth"]);
 
export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  if (!isPublicPage(request) && !(await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, "/auth");
  }
  // TODO : Redirect away from auth if authenticated
  if(isPublicPage(request) &&(await convexAuth.isAuthenticated())){
    return nextjsMiddlewareRedirect(request, "/");
  }
  });
   
 
export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};