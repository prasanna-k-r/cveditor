import { Component } from "react";
import { Button, Navbar,NavbarBrand, NavbarText } from "reactstrap";

class Header extends Component {
    render(){
        return(
            <div>
                <Navbar color="light" expand="md" fixed="top">
                    <NavbarBrand to="/">Orangesand</NavbarBrand>
                    <Button>
                        Sign In
                    </Button>
                </Navbar>
            </div>
        )
    }
}

export default Header;