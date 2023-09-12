import { useState } from "react";
import { UserInformation } from "../types";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";

export const FunctionalApp = () => {
  const [userInformation, setUserInformation] = useState(
    null as UserInformation | null
  );

  const updateUserInformation = (newUser: UserInformation) => {
    setUserInformation(newUser);
  };

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={userInformation} />
      <FunctionalForm updateUser={updateUserInformation} />
    </>
  );
};
