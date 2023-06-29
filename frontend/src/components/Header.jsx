import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/userApiSlice';
import { useNavigate } from 'react-router-dom';


function Header() {
  const { userInfo } = useSelector((state) => state.auth);
   
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const[logoutApiCall] = useLogoutMutation();

const logoutHandler = async()=>{
  try {
     await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/')
  } catch (error) {
     console.log(error)
  }
}


  return (
    <Navbar bg='dark' variant='dark' expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to={'/'}>
          <Navbar.Brand >Mern Auth</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="" style={{ margin: 'auto' }}>

            {userInfo ? (
              <>
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      Profile
                    </NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler}>
                      LogOut
                    </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>

                <LinkContainer to={'/login'}>
                  <Nav.Link >Sign In</Nav.Link>
                </LinkContainer>

                <LinkContainer to={'/register'}>
                  <Nav.Link >Sign up</Nav.Link>
                </LinkContainer>
              </>
            )}



          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;