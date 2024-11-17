import { useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  return (
    <h2>
      <span className="text-blood-red">404</span> | No Page
    </h2>
  );
};

export default ErrorBoundary;
