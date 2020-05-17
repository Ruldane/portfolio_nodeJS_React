import Link from 'next/link';
import ActiveLink from '../ActiveLink'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    DropdownToggle,
    DropdownItem,
    Dropdown,
    DropdownMenu
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
    const className = props.className || "";
    return (
        <ActiveLink href={route} activeClassName="active">
            <a className={`nav-link port-navbar-link ${className}`}>{title}</a>
        </ActiveLink>
    )
}

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            dropdownOpen: false
        };

        this.toggle = this.toggle.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    renderBlogMenu() {
        const { isSiteOwner } = this.props;

        if (isSiteOwner) {
            return (
                <Dropdown className="port-navbar-link port-dropdown-menu" nav isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                    <DropdownToggle className="port-dropdown-toggle" nav caret>
                        Blog
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
                            <BsNavLink className="port-dropdown-item"
                                       route="/blogs"
                                       title="Blogs" />
                        </DropdownItem>
                        <DropdownItem>
                            <BsNavLink className="port-dropdown-item"
                                       route="/blogEditor"
                                       title="Créer" />
                        </DropdownItem>
                        <DropdownItem>
                            <BsNavLink className="port-dropdown-item"
                                       route="/blogs/userBlogs"
                                       title="Dashboard" />
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            )
        }

        return (
            <NavItem className="port-navbar-item">
                <BsNavLink route="/blogs" title="Blog" />
            </NavItem>
        )
    }

    render() {

        const {isAuthenticated, user, className} = this.props;
        const { isOpen } = this.state;

        const menuOpenClass = isOpen ? 'menu-open' : 'menu-close';

        return (
            <div>
                <Navbar className={`port-navbar port-nav-base absolute ${className} ${menuOpenClass}`} color="transparent"  dark light expand="md">
                    <NavbarBrand className="port-navbar-brand" href="/">Nizzoli Laurent</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem className="port-navbar-item">
                                <BsNavLink route="/" title="Home"/>
                            </NavItem>
                            <NavItem className="port-navbar-item">
                                <BsNavLink route="/about" title="À propos"/>
                            </NavItem>
                            <NavItem className="port-navbar-item">
                                <BsNavLink route="/portfolios" title="Portfolios"/>
                            </NavItem>
                            <NavItem className="port-navbar-item">
                                <BsNavLink route="/projects" title="Projets"/>
                            </NavItem>
                                {this.renderBlogMenu()}
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
