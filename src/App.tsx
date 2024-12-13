import { Toaster, ToastBar } from "react-hot-toast";
import routers from "./routers";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <>
      <RouterProvider router={routers} />
      <Toaster toastOptions={{ duration: 2000, position: "bottom-right" }}>
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
