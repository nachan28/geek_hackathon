import "./App.css";
import "./firebaseApp";
import { useEffect, useState } from "react";
import Header from "./Header";
import * as React from "react";
import {
  getAuth,
  Auth,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const UserName = React.createContext({});

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [provider, setProvider] = useState<GithubAuthProvider | null>(null);
  const [owner, setOwner] = useState("");
  const value = {
    owner,
    setOwner,
  };
  const [repoNames, setRepoNames] = useState<string[]>([]);

  // GitHub OAuth Provider ObjectのInstanceを作成
  useEffect(() => {
    if (provider === null) {
      const newProvider = new GithubAuthProvider();
      newProvider.addScope("repo"); // 既定ではユーザー自身のemailを取得するスコープしか付与されない。必要に応じてスコープを追加する
      setProvider(newProvider);
    }
  }, [provider]);

  // Firebase Appに対するAuth instanceを取得
  useEffect(() => {
    if (provider !== null && auth === null) {
      setAuth(getAuth());
      console.log(auth);
    }
  }, [auth, provider]);

  // ポップアップによるサインインを実施し、成功したらアクセストークンを取得する
  useEffect(() => {
    if (provider !== null && auth !== null && token === null) {
      signInWithPopup(auth, provider).then((result) => {
        //@ts-ignore
        console.log(result._tokenResponse.screenName);
        //@ts-ignore
        setOwner(result._tokenResponse.screenName);
        const credential = GithubAuthProvider.credentialFromResult(result);
        if (credential && credential.accessToken) {
          setToken(credential.accessToken);
          console.log("token: " + credential.accessToken);
        }
        console.log(result.user);
      });
    }
  }, [auth, provider, token]);

  // アクセストークンを使用してGitHub API（GET /Issues）へリクエストする
  useEffect(() => {
    if (token !== null) {
      fetch(`https://api.github.com/users/${owner}/repos?per_page=100&page=1`, {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application / vnd.github.v3 + json",
        },
      }).then((result) => {
        result.json().then((result) => {
          setRepoNames(result.map((obj) => obj.name));
          console.log(repoNames);
        });
      });
    }
  }, [token]);

  return (
    <UserName.Provider value={value}>
      <div className="App">
        <Header></Header>
        <header className="App-header">
          {repoNames.map((repo, index) => {
            return (
              <div>
                <p key={index}>{repo}</p>
              </div>
            );
          })}
        </header>
      </div>
    </UserName.Provider>
  );
}

export default App;


