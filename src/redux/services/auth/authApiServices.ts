import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { apiServices } from "../api/apiService";
import {
  auth,
  db,
  facebookProvider,
  provider,
  storage,
} from "@/firebase/firebaseConfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { handleFirebaseAuthErrors } from "@/utility/firebaseError";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "sonner";
import axios from "axios";

export const authApiServices = apiServices.injectEndpoints({
  endpoints: (builder) => ({
    signUpNewUser: builder.mutation({
      queryFn: async (data) => {
        try {
          const {
            firstName,
            lastName,
            email,
            password,
            checkedUser,
            isVender,
          } = data;
          let currentUser;

          await createUserWithEmailAndPassword(auth, email, password).then(
            async (userCredential) => {
              const user = userCredential.user;

              const userRef = doc(db, "users", user.uid);
              const storeData = {
                id: user.uid,
                name: `${firstName} ${lastName}`,
                email: email,
                is_vendor: isVender,
              };

              await axios
                .post(
                  "https://api.meetingstation1.com/api/users/register",
                  storeData
                )
                .then((responseData) => {
                  console.log(`تمت استجابه API`);
                })
                .catch((error) => {
                  console.log(error);
                });

              await updateProfile(user, {
                displayName: `${firstName} ${lastName}`,
                photoURL: "",
              });

              const userDoc = {
                displayName: `${firstName} ${lastName}`,
                email,
                photoURL: "",
                dateJoin: user.metadata.creationTime || new Date().getTime(),
                id: user.uid,
                user: checkedUser,
                isVender,
              };

              await setDoc(userRef, userDoc);
              currentUser = userDoc;
            }
          );

          return { data: currentUser };
        } catch (error) {
          handleFirebaseAuthErrors(error);
          return { error };
        }
      },
    }),
    signIn: builder.mutation({
      queryFn: async (data: any) => {
        try {
          const { email, password } = data;

          await signInWithEmailAndPassword(auth, email, password);
          return { data: "ok" };
        } catch (error) {
          handleFirebaseAuthErrors(error);
          return { error };
        }
      },
    }),
    signInWithGoogle: builder.mutation({
      queryFn: async () => {
        try {
          await signInWithPopup(auth, provider).then(async (data) => {
            const user = data.user;
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
              id: user.uid,
              displayName: user.displayName,
              photoURL: user?.photoURL || "",
              email: user.email,
              user: "user",
              is_vendor: false,
              dateJoin: user.metadata.creationTime || new Date().getTime(),
            });
            console.log(data)
          });
          return { data: "ok" };
        } catch (error) {
          handleFirebaseAuthErrors(error);
          return { error };
        }
      },
    }),
    signInWithFacebook: builder.mutation({
      queryFn: async () => {
        try {
          await signInWithPopup(auth, facebookProvider).then(async (data) => {
            const user = data.user;
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
              id: user.uid,
              displayName: user.displayName,
              photoURL: user?.photoURL || "",
              email: user.email,
              user: "user",
              dateJoin: user.metadata.creationTime || new Date().getTime(),
            });
          });

          return { data: "ok" };
        } catch (error) {
          handleFirebaseAuthErrors(error);
          return { error };
        }
      },
    }),
    forgetPass: builder.mutation({
      queryFn: async (data) => {
        try {
          const { email } = data;

          await sendPasswordResetEmail(auth, email);
          return { data: "ok" };
        } catch (error) {
          handleFirebaseAuthErrors(error);
          return { error };
        }
      },
    }),
    signOut: builder.mutation({
      queryFn: async () => {
        try {
          await signOut(auth);
          return { data: "ok" };
        } catch (error) {
          handleFirebaseAuthErrors(error);
          return { error };
        }
      },
    }),

    updateUserProfile: builder.mutation({
      queryFn: async (data: any) => {
        try {
          const { name, file, id, userData, currentUser } = data;

          const photo = file[0];
          const photoName = photo?.name;
          const userRef = doc(db, "users", id);

          if (photo) {
            const storageRef = ref(storage, `images/${id}/${photoName}`);
            const uploadTask = uploadBytesResumable(storageRef, photo);

            uploadTask.on(
              "state_changed",
              (snapshot) => {},
              (error) => {
                toast.error(error.message);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then(
                  async (downloadURL) => {
                    await updateProfile(currentUser, {
                      displayName: name,
                      photoURL: downloadURL,
                    });

                    await setDoc(userRef, {
                      id: userData.id,
                      displayName: name,
                      email: userData.email,
                      photoURL: downloadURL,
                      user: userData?.user,
                    });
                  }
                );
              }
            );
          } else {
            updateProfile(currentUser, {
              displayName: name,
            });

            setDoc(userRef, {
              id: userData.id,
              displayName: name,
              email: userData.email,
              user: userData.user,
              dataJoin: userData.dataJoin,
              photoURL: "",
            });
          }

          // updateProfile(user, {
          //   displayName: name,
          // });

          // setDoc(userRef, {
          //   id: id,
          //   displayName: name,
          //   email,
          //   country,
          //   city,
          //   phone,
          // });

          return { data: "ok" };
        } catch (error) {
          handleFirebaseAuthErrors(error);
          return { error };
        }
      },
    }),

    changeNewPass: builder.mutation({
      queryFn: async (data) => {
        try {
          const { password } = data;
          const urlParams = new URLSearchParams(window.location.search);
          const oobCode = urlParams.get("oobCode");

          if (oobCode) {
            await confirmPasswordReset(auth, oobCode, password);
          }

          return { data: "ok" };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const {
  useSignUpNewUserMutation,
  useSignInMutation,
  useSignInWithGoogleMutation,
  useSignInWithFacebookMutation,
  useForgetPassMutation,
  useSignOutMutation,
  useUpdateUserProfileMutation,
  useChangeNewPassMutation,
} = authApiServices;
