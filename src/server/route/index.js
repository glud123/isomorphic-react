import React from "react";
import { Route } from "react-router-dom";
import AppRouteContainer from "../../common/route";

const AppRoute = ({ initialData, pageInfo, component: Comp }) => {
  return (
    <AppRouteContainer>
      {(route) => {
        let { path, exact } = route;
        return (
          <Route
            key={route.path}
            path={path}
            exact={exact}
            render={(props) => (
              <Comp {...props} pageInfo={pageInfo} initialData={initialData} />
            )}
          ></Route>
        );
      }}
    </AppRouteContainer>
  );
};

export default AppRoute;
