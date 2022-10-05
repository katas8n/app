import { useState, useEffect, useCallback } from "react";

export const useGetUserData = (url) => {
  const [usersData, setUserData] = useState([]);

  const getUserData = useCallback(async () => {
    const fetchedUserData = await fetch(url);
    const receivedUserData = await fetchedUserData.json();
    await setUserData(Object.values(receivedUserData));
  }, [url]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return usersData;
};
