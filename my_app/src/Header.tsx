import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import { UserName } from "./App";
import Button from './Button';

function Header(): JSX.Element {
  return (
    <UserName.Consumer>
      {/* @ts-ignore */}
      {({ owner, setOwner }) => {
        if (owner) {
          return (
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
          );
        }else{
            return Button;
        }
      }}
    </UserName.Consumer>
  );
}

export default Header;
