// This file is for runtime, not the compile time.
import { IRoute } from 'umi';
import Policy from '@pansy/policy';

type Routes = IRoute[];

export function traverseModifyRoutes(routes: Routes, authority: Policy) {
  const resultRoutes: Routes = []
    .concat(routes as any)
    .map((resultRoute: IRoute) => {
      const { routes } = resultRoute;
      return {
        ...resultRoute,
        // return new route to routes.
        routes: routes ? routes.map((route: any) => ({ ...route })) : routes,
      };
    });
  const notHandledRoutes: Routes = [];

  notHandledRoutes.push(...resultRoutes);

  for (let i = 0; i < notHandledRoutes.length; i++) {
    const currentRoute = notHandledRoutes[i];
    let currentRouteAccessible =
      typeof currentRoute.unaccessible === 'boolean'
        ? !currentRoute.unaccessible
        : true;
    if (currentRoute && currentRoute.authority) {
      if (typeof currentRoute.authority !== 'string') {
        throw new Error(
          '[plugin-authority]: "authority" field set in "' +
            currentRoute.path +
            '" route should be a string.',
        );
      }
      const authorityProp = authority.combinationVerify(currentRoute.authority);
      if (typeof authorityProp === 'boolean') {
        currentRouteAccessible = authorityProp;
      }
      currentRoute.unaccessible = !currentRouteAccessible;
    }

    if (currentRoute.routes || currentRoute.childRoutes) {
      const childRoutes: Routes =
        currentRoute.routes || currentRoute.childRoutes;
      if (!Array.isArray(childRoutes)) {
        continue;
      }
      childRoutes.forEach(childRoute => {
        childRoute.unaccessible = !currentRouteAccessible;
      }); // Default inherit from parent route
      notHandledRoutes.push(...childRoutes);
    }
  }

  // Make parent route unaccessible if child routes exist and all of child routes are unaccessible
  for (let i = 0; i < notHandledRoutes.length; i++) {
    const currentRoute = notHandledRoutes[i];
    const childRoutes: Routes = currentRoute.routes || currentRoute.childRoutes;
    const isAllChildRoutesUnaccessible =
      Array.isArray(childRoutes) &&
      childRoutes.every(route => route.unaccessible);
    if (!currentRoute.unaccessible && isAllChildRoutesUnaccessible) {
      currentRoute.unaccessible = true;
    }
  }

  return resultRoutes;
}
