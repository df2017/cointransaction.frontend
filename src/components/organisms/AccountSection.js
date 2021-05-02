/**
 * @description      :
 * @author           : Admin
 * @group            :
 * @created          : 01/05/2021 - 21:00:41
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 01/05/2021
 * - Author          : Admin
 * - Modification    :
 **/
import React, {useState, useEffect} from 'react';
import DepositButton from '../atoms/buttons/DepositButton';
import {InstanceAuth} from '../../services/BaseInstance';
import AmountModal from '../molecules/AmountModal';
import {BehaviorSubject} from 'rxjs';

const $amount = new BehaviorSubject(0);

function AccountSection() {

  const [amountShow, setAmountShow] = useState(false);

  const [amount, setAmount] = useState(0);

  async function AmountUpdate(){
    const userAuth = localStorage.getItem('user');
    const user = JSON.parse(userAuth)[0].username;
    const result = await InstanceAuth.get(`wallet/?name=${user}`);
    if(result.status === 200){
      setAmount(result.data.results[0])
      $amount.next(result.data.results[0]);
    }
    setAmountShow(true)
  }

  useEffect(() => {
    AmountUpdate()
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log($amount.value);
  return (
    <article className="message is-dark">
      <div className="message-header">
        <p className="mt-1 mb-1">Account</p>
      </div>
      <div className="message-body is-centered">
        <div className="columns">
          <div className="column">
            <h4 className="title is-5 m-2">Available</h4>
            <h4 className="subtitle is-5 m-3">
              $ {amountShow? $amount.value?.amount : amount.amount}
            </h4>
          </div>
          <div className="column"></div>
          <div className="column"></div>
          <div className="column">
            <DepositButton onClick={handleShow} />
            <AmountModal show={show} handleClose={handleClose} />
          </div>
        </div>
      </div>
    </article>
  );
}

export {AccountSection, $amount};
