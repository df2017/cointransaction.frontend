/**
 * @description      :
 * @author           : Admin
 * @group            :
 * @created          : 01/05/2021 - 23:22:54
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 01/05/2021
 * - Author          : Admin
 * - Modification    :
 **/
import React, {useState} from 'react';
import ReceiveButton from '../atoms/buttons/ReceiveButton';
import SendButton from '../atoms/buttons/SendButton';
import BuyButton from '../atoms/buttons/BuyButton';
import ReceiveModal from './ReceiveModal';
import BuyModal from './BuyModal';
import {InstanceAuth} from '../../services/BaseInstance';
import SendModal from './SendModal';

const AmountTotalCurrency = async (address, coin) => {
  const addressResult = await InstanceAuth.get(`transactionsout/?spent=false&address=${address}&type_coin=${coin}`)
  const amountTotal = []
  addressResult.data.results.map((value) => {
      amountTotal.push(parseFloat(value.amount))
  })
  return amountTotal.reduce((a, b) => a + b, 0).toFixed(8)
}

function CurrencyBlock({nameCurrency, symbol}) {

  const [amountCurrency, setAmountCurrency] = useState("");
  const [showReceive, setShowReceive] = useState(false);
  const [showSend, setShowSend] = useState(false);
  const [showBuy, setShowBuy] = useState(false);

  const receiveHandleClose = () => {
    setShowReceive(false);
  };
  const sendHandleClose = () => {
    setShowSend(false);
  };
  const buyHandleClose = () => {
    setShowBuy(false);
  };

  const receiveHandleShow = () => setShowReceive(true);
  const sendHandleShow = () => setShowSend(true);
  const buyHandleShow = () => setShowBuy(true);

  const userSession = localStorage.getItem('user');
  const user = JSON.parse(userSession)[0].id;

  InstanceAuth.get(`currency/?symbol=${symbol}&owner=${user}`).then( async (resp) =>{
    if (resp.status === 200) {
      const address =  resp.data.results[0].address
      const amountValue = await AmountTotalCurrency(address, symbol)
      setAmountCurrency(amountValue)
    }
  })
    
  return (
    <div className="column is-4">
      <article className="box">
        <div className="columns">
          <div className="column">
            <p className="title is-5">
              {amountCurrency ? amountCurrency : 0} {symbol}
            </p>
            <p className="subtitle is-4">{nameCurrency}</p>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <ReceiveButton onClick={receiveHandleShow} />
            <ReceiveModal
              show={showReceive}
              handleClose={receiveHandleClose}
              currency={symbol}
            />

            <SendButton onClick={sendHandleShow} />
            <SendModal
              show={showSend}
              handleClose={sendHandleClose}
              currency={symbol}
            />

            <BuyButton onClick={buyHandleShow} />
            <BuyModal
              show={showBuy}
              handleClose={buyHandleClose}
              currency={symbol}
            />
          </div>
        </div>
      </article>
    </div>
  );
}

export {CurrencyBlock, AmountTotalCurrency};
