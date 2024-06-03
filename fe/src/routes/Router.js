import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Advert from "../views/Advert/index.js";
import AddAdvert from "../views/AddAdvert/index.js";
import AddProduct from "../views/AddProduct/index.js"

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.js"));
/****End Layouts*****/

/*****Pages******/
const Dashboard1 = lazy(() => import("../views/dashboards/Dashboard1.js"));

/*****Tables******/
const BasicTable = lazy(() => import("../views/tables/BasicTable.js"));


const FormLayouts = lazy(() => import("../views/FormLayouts/FormLayouts.js"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="dashboards/dashboard1" /> },
      { path: "dashboards/dashboard1", exact: true, element: <Dashboard1 /> },
      { path: "advert", exact: true, element: <Advert /> },
      { path: "advert/add", exact: true, element: <AddAdvert /> },
      { path: "product/add", exact: true, element: <AddProduct /> },
      { path: "tables/basic-table", element: <BasicTable /> },
      { path: "/form-layouts/form-layouts", element: <FormLayouts /> },
    ],
  },
];

export default ThemeRoutes;
