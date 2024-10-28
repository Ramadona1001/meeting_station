import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const GetUser = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      setCurrentUser(user);
    });
  }, []);
  return currentUser;
};

export default GetUser;
