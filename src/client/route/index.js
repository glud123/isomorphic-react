import React from "react";
import { Route } from "react-router-dom";
import AppRouteContainer from "../../common/route";
import AsyncLoader from "./asyncLoader";

const AppRoute = ({ mod }) => {
  let initialData = document.getElementById("ssrTextInitData").value;
  if (initialData && initialData != "null") {
    initialData = JSON.parse(initialData);
  } else {
    initialData = {
      fetchData: null,
      pageInfo: null,
    };
  }
  // 首次加载标识
  let init = true;
  return (
    <AppRouteContainer>
      {(route) => {
        let { path, exact, page } = route;
        return (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={(props) => {
              if (init) {
                init = false;
              } else {
                mod = null;
              }
              return (
                <AsyncLoader page={page} mod={mod}>
                  {(Comp) => (
                    <Comp
                      {...props}
                      initialData={initialData.fetchData}
                      pageInfo={initialData.pageInfo}
                    />
                  )}
                </AsyncLoader>
              );
            }}
          ></Route>
        );
      }}
    </AppRouteContainer>
  );
};

export default AppRoute;
