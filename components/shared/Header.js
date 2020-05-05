import Link from 'next/link';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';

import Auth0 from "../../services/auth0";

const Login = () => {
    return (
        <span onClick={Auth0.login} className="nav-link port-navbar-link clickable">Login</span>
    )
}

const Logout = () => {
    return (
        <span onClick={Auth0.logout} className="nav-link port-navbar-link clickable">Logout</span>
    )
}

const BsNavLink = props => {
    const { route, title } = props;
    return (
        <Link href={route}>
            <a className="nav-link port-navbar-link">{title}</a>
        </Link>
    )
}

export default class Header extends React.Component {

    state = { isOpen: false }
    toggle = () => this.setState({isOpen: !this.state.isOpen})

    render() {

        const {isAuthenticated, user, className} = this.props;

        const { isOpen } = this.state;
        return (
            <div>
                <Navbar className={`port-navbar port-nav-base absolute ${className}`} color="transparent"  dark light expand="md">
                    <NavbarBrand className="port-navbar-brand" href="/">Nizzoli Laurent</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem className="port-navbar-item">
                                <BsNavLink route="/" title="Home"/>
                            </NavItem>
                            <NavItem className="port-navbar-item">
                                <BsNavLink route="/about" title="About"/>
                            </NavItem>
                            <NavItem className="port-navbar-item">
                                <BsNavLink route="/portfolios" title="Portfolios"/>
                            </NavItem>
                            <NavItem className="port-navbar-item">
                                <BsNavLink route="/blogs" title="Blogs"/>
                            </NavItem>
                            <NavItem className="port-navbar-item">
                                <BsNavLink route="/cv" title="Cv"/>
                            </NavItem>
                            { !isAuthenticated &&
                                <NavItem className="port-navbar-item">
                                    <Login/>
                                </NavItem>
                            }
                            { isAuthenticated &&
                                <NavItem className="port-navbar-item">
                                    <Logout/>
                                </NavItem>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
