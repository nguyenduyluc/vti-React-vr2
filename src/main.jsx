import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import ErrorPage from "./error-page";
import Contact, { loader as contactLoader } from "./routes/contact";

import { action as editAction } from "./routes/edit";

import { action as postAction } from "./routes/create";

import EditContact from "./routes/edit";
import CreateContact from "./routes/create";

import { action as destroyAction } from "./routes/destroy";
import Index from "./routes";

// data res
import DataRes from "./component/routes/dataRes";
import DataEditComponent from "./component/routes/dataEdit";

// private
import RequireAuth from "./auth/RequireAuth";
import { fakeAuthProvider } from "./auth/auth";
import RegisterAndLogin from "./auth/RegisterAndLogin";
import DataCreateComponent from "./component/routes/dataCreate";

import store from "./store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Root />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
    // call và load data từ bên contact
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
        action: editAction,
      },
      {
        path: "contacts/postContact",
        element: <CreateContact />,
        loader: contactLoader,
        action: postAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
      },
      {
        path: "data",
        element: <DataRes />,
      },
      {
        path: "data/dataDeatail/:dataId",
        element: <DataEditComponent />,
      },
      {
        path: "dataCreate",
        element: <DataCreateComponent />,
      },
    ],
  },
  {
    path: "/login",
    element: <RegisterAndLogin />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* redux */}
    <Provider store={store}>
      {/* context api */}
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

let AuthContext = React.createContext(null);

export const useAuth = () => {
  return React.useContext(AuthContext);
};

function AuthProvider({ children }) {
  // user kieem tra xem nguoi dung login chua
  let [user, setUser] = React.useState(null);

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser.user.email);
      localStorage.setItem("tokenUser", newUser._tokenResponse.idToken);
      localStorage.setItem("user", newUser.user.email);
      callback;
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      localStorage.clear();
      callback;
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
