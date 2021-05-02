/**
 * @description      :
 * @author           : Admin
 * @group            :
 * @created          : 01/05/2021 - 22:19:29
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 01/05/2021
 * - Author          : Admin
 * - Modification    :
 **/
import React, {useState} from 'react';
import LogoutButton from '../atoms/buttons/LogoutButton';
import {useHistory} from 'react-router-dom';

function NavBar() {
  const history = useHistory();
  const [isActive, setisActive] = useState(false);
  const dataUser = localStorage.getItem('user');
  const email = JSON.parse(dataUser)[0].email;

  const logout = () => {
    localStorage.clear();
    history.push('/login');
    return {isSignedIn: false};
  };

  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand is-centered">
        <h4 className="navbar-item is-size-5 is-text-white">
          Coin Transaction
        </h4>

        {/* eslint-disable-next-line */}
        <a
          onClick={() => {
            setisActive(!isActive);
          }}
          role="button"
          className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navbarBasicExample"
        className={`navbar-menu navbar-end ${isActive ? 'is-active' : ''}`}
      >
        <div className="navbar-end">
          <div className="navbar-item">
            <label
              className={`label m-2 mr-4 ${isActive ? '' : 'has-text-white'}`}
            >
              {email}
            </label>
            <LogoutButton onClick={logout} />
          </div>
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
