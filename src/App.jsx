import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth(); // ask the reception desk: what's the login state?

  if (auth.isLoading) {
    return <p>Loading…</p>;
  }

  if (auth.error) {
    return <p>Login error: {auth.error.message}</p>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <h1>Servas Kunlaboro</h1>
        <p>Logged in ✅</p>
        <p>Your id (sub): {auth.user?.profile.sub}</p>
        <button onClick={() => auth.removeUser()}>Log out</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Servas Kunlaboro</h1>
      <button onClick={() => auth.signinRedirect()}>Log in</button>
    </div>
  );
}

export default App;
