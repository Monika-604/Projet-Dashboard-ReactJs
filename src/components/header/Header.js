import { Navbar, Nav, Button, Form } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setLogin, setUser} from '../../Redux/Actions'

function Header(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(
        (state) => state.userDetail.user
    );
    const isLogin = useSelector(
        (state) => state.userDetail.isLoging
    );
    return (
        <Navbar expand="lg" style={{ background: "#69c29e" }}>
            {/* <Navbar.Brand href="/">Title</Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" >
                    <Nav.Link href="/">Home</Nav.Link>
                    {
                        !isLogin && <Nav.Link href="/login">Login</Nav.Link>
                    }
                    {
                        !isLogin && <Nav.Link href="/register">Register</Nav.Link>
                    }
                </Nav>
                <Form inline>
                    {
                        isLogin && user && user.username && <Button variant="outline-success">{user.username}</Button>
                    }

                </Form>
                {
                    isLogin && <Button className="bg-secondary border-secondary mr-5 ml-2"
                        variant="danger"
                        onClick={() => {
                            dispatch(setLogin(false))
                            localStorage.clear();
                            history.push('/login')

                        }}>
                        LogOut

                </Button>
                }
           
            </Navbar.Collapse>
        </Navbar>

    );
}

export default Header;
