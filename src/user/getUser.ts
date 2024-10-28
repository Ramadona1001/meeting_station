import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import GetUser from "./currentUser";

export const GetCurrentUser = () => {
  const [user, setUser]: undefined | null | any = useState(null);

  const currentUser: any = GetUser();

  useEffect(() => {
    const fetchData = async () => {
      const userRef = doc(db, "users", currentUser?.uid);
      const data = await getDoc(userRef);

      setUser(data.data());
    };

    fetchData();
  }),
    [];

  return user;
};
