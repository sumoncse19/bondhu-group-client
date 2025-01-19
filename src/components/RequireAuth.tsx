"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, ComponentType } from "react";

type RequireAuthProps = {
  // Define the props expected by the wrapped component
  [key: string]: unknown;
};

const RequireAuth = <P extends RequireAuthProps>(
  WrappedComponent: ComponentType<P>
) => {
  const ComponentWithAuth = (props: P) => {
    const router = useRouter();

    const token: string = Cookies.get("token") || "";

    console.log(token, "token from auth");

    const isAuthenticated = !!token; // Replace with your authentication logic

    console.log(isAuthenticated, "isAuthenticated");

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login"); // Redirect to login page if not authenticated
      }
    }, [isAuthenticated, router]);

    // Render the wrapped component if authenticated
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return ComponentWithAuth;
};

export default RequireAuth;
