/**
 * @description      :
 * @author           : Admin
 * @group            :
 * @created          : 02/05/2021 - 15:54:36
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 02/05/2021
 * - Author          : Admin
 * - Modification    :
 **/
import React, {useState} from 'react';
import {InstanceAuth} from '../../services/BaseInstance';

function ReceiveModal({show, handleClose, currency}) {
  const showHideClassName = show ? 'modal is-active' : 'modal';
  const [address, setAddress] = useState('');

  const userSession = localStorage.getItem('user');
  const user = JSON.parse(userSession)[0].id;
  InstanceAuth.get(`currency/?symbol=${currency}&owner=${user}`).then(
    (resp) => {
      if (resp.status === 200) {
        setAddress(resp.data.results[0].address);
      }
    }
  );

  return (
    <div className={showHideClassName}>
      <div className="modal-background" onClick={handleClose} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Address</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleClose}
            type="button"
          />
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">{address}</label>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button" type="button" onClick={handleClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ReceiveModal;
