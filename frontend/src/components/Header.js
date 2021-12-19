import React from 'react'
import { Navbar, Nav, Container, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Header() {
    return (
        <div>
            <header>

            <Navbar bg="light" expand="lg" collapseOnSelect>
            <Container>
                    <LinkContainer to='/'>
                    <Navbar.Brand >SHOP_NAME</Navbar.Brand>
                    </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to='/cart'>
                        <Nav.Link>Cart</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/login'>
                        <Nav.Link>Login</Nav.Link> 
                    </LinkContainer>                                    
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            </header>
        </div>
    );
}

export default Header