import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
// import { MyContext } from "./App";
import { UserName } from "./App";

function Header(): JSX.Element {
  //   const owner: string = React.useContext(MyContext);
  return (
    <UserName.Consumer>
      {/* @ts-ignore */}
      {({ owner, setOwner }) => (
        <Navbar>
          <Container>
            <Navbar.Brand href="#home">MyCodeCounter</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <a href="#login">{owner}</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </UserName.Consumer>
  );
}

export default Header;
