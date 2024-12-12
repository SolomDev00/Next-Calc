import { Toaster, ToastBar } from "react-hot-toast";
import routers from "./routers";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <>
      <RouterProvider router={routers} />
      <Toaster toastOptions={{ duration: 3400, position: "top-right", className: "mt-20" }}>
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              animation: t.visible ? 'custom-enter 1s ease' : 'custom-exit 1s ease',
            }}
          />
        )}
      </Toaster>;
    </>
  );
};

export default App;
