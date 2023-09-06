import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root, { loader as rootLoader , action as rootAction,
} from "./routes/root";
import ErrorPage from "./error-page";
import Contact, {loader as contactLoader} from "./routes/contact";
import EditContact from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";

import { action as editAction } from "./routes/edit";

import Index from "./routes/index";
// data res
import DataRes from "./component/routes/dataRes";

import DataEditComponent from "./component/routes/dataEdit";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction
      },

      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
      },
      {
        path: "data",
        element:  <DataRes/>
      },
      {
        path: "data/dataDeatail/:dataId",
        element:  <DataEditComponent/>
      }
    ],
  },
  // {
  //   path: "contacts/:contactId",
  //   element: <Contact />,
  // },
  {
    path: "/hello",
    element: <>test sample</>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);