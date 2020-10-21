import React from "react";
import { AuthenticationForm, useCurrentUser } from "feather-client-react";
import Todos from "./Todos";

const styles = {
  title: provided => ({
    ...provided,
    fontSize: "40px",
    fontWeight: 700
  })
};

function App(props) {
  const { loading, currentUser } = useCurrentUser();

  if (loading) return <div />;
  if (!currentUser)
    return (
      <div className="app">
        <AuthenticationForm styles={styles} />
      </div>
    );
  return (
    <div className="app">
      <div className="app-header">
        <h1>My to-do list</h1>
        <p>{currentUser.email}</p>
      </div>
      <Todos />
    </div>
  );
}

export default App;
