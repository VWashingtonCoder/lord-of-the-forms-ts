import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { UserInformation } from "../types";
import { ProfileInformation } from "../ProfileInformation";
type State = { userInformation: UserInformation | null };

const defaultUser: UserInformation = {
  email: "default@default.com",
  firstName: "Default",
  lastName: "Default",
  phone: "1234567",
  city: "Hobbiton",
};

export class ClassApp extends Component<Record<string, never>, State> {
  state = { userInformation: defaultUser };

  updateUserInformation = (newUser: UserInformation) => {
    this.setState({ userInformation: newUser });
  };

  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={this.state.userInformation} />
        <ClassForm updateUser={this.updateUserInformation} />
      </>
    );
  }
}
