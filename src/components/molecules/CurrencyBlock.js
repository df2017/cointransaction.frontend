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

function CurrencyBlock({nameCurrency, symbol, amount}) {
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

  return (
    <div className="column is-4">
      <article className="box">
        <div className="columns">
          <div className="column">
            <p className="title is-5">
              {amount ? amount : 0} {symbol}
            </p>
            <p className="subtitle is-4">{nameCurrency}</p>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <ReceiveButton onClick={receiveHandleShow}/>
            <ReceiveModal
              show={showReceive}
              handleClose={receiveHandleClose}
              currency={symbol}
            />
            <SendButton onClick={sendHandleShow} />
            <BuyButton onClick={buyHandleShow} />
          </div>
        </div>
      </article>
    </div>
  );
}

export default CurrencyBlock;
