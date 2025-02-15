import React, { useEffect, useRef } from "react";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useIsLoggedInStore,
  useShouldFetchUserStore,
  useUserStore,
} from "../../../store/authStore";
import { jwtDecode } from "jwt-decode";

interface ChildrenProps {
  children: React.ReactNode;
}

const CheckLogin: React.FC<ChildrenProps> = ({ children }) => {
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const setUser = useUserStore((state) => state.setUser);
  const setIsLoggedIn = useIsLoggedInStore((state) => state.setIsLoggedIn);
  const shouldFetchUser = useShouldFetchUserStore(
    (state) => state.shouldFetchUser
  );
  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  const timeoutAccTokenRef = useRef<number | null>(null);
  const baseURL = useBaseURLStore((state) => state.baseURL);

  function getUser() {
    if (!accessToken) return;
    fetch(`${baseURL}/user`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setIsLoggedIn(true);
          setUser(data.user);
        } else {
          setIsLoggedIn(false);

          setUser(null);
        }
      })
      .catch((error) => {
        setIsLoggedIn(false);
        setUser(null);
        console.log(error);
      });
  }

  useEffect(() => {
    return () => {
      if (timeoutAccTokenRef.current) {
        clearTimeout(timeoutAccTokenRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (accessToken) getUser();
  }, [shouldFetchUser, setUser, accessToken]);

  function refreshToken() {
    fetch(`${baseURL}/user/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          setIsLoggedIn(true);
          setAccessToken(data.accessToken);
          // handleRefreshToken();
        } else {
          setIsLoggedIn(false);
          setUser(null);
          // toast.error(data.message);
        }
      })
      .catch((error) => {
        setIsLoggedIn(false);
        setUser(null);
        console.log(error);
      });
  }

  function handleRefreshToken() {
    if (accessToken) {
      const decodedToken = jwtDecode<{ exp?: number }>(accessToken);

      let refreshTime = decodedToken?.exp
        ? decodedToken?.exp - Date.now() / 1000
        : 0;
      refreshTime = refreshTime - 50;

      if (timeoutAccTokenRef.current) {
        clearTimeout(timeoutAccTokenRef.current);
      }

      if (refreshTime > 0) {
        timeoutAccTokenRef.current = setTimeout(() => {
          refreshToken();
        }, refreshTime * 1000);
      }
    }
  }

  useEffect(() => {
    if (!accessToken) {
      refreshToken();
    } else handleRefreshToken();
  }, [accessToken]);

  return <>{children}</>;
};

export default CheckLogin;
