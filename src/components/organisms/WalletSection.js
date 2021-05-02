/**
 * @description      :
 * @author           : Admin
 * @group            :
 * @created          : 01/05/2021 - 23:46:14
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 01/05/2021
 * - Author          : Admin
 * - Modification    :
 **/
import React, {useState, useEffect} from 'react';
import CurrencyBlock from '../molecules/CurrencyBlock';
import CurrencyModal from '../molecules/CurrencyModal';
import {InstanceAuth} from '../../services/BaseInstance';

function WalletSection() {
  //const elements = ['one', 'two', 'three'];
  const [itemList, setItemList] = useState([]);

  const items = [];
  
  async function chargeCurrencies(){
    const userSession = localStorage.getItem('user');
    const searchWallet = await InstanceAuth.get(
      `wallet/?name=${JSON.parse(userSession)[0].username}`
    );
    if (searchWallet.status === 200) {
      const searchCurrencies = await InstanceAuth.get(
        `connector/?id_wallet=${searchWallet.data.results[0].id}`
      );
      console.log('searchCurrencies', searchCurrencies);

      if (searchCurrencies.status === 200) {
        setItemList(searchCurrencies.data.results)
      }
    }
  }

  
  useEffect(() => {
    chargeCurrencies()
  },[]);

  for (const [index, value] of itemList.entries()) {
    items.push(
      <CurrencyBlock 
        nameCurrency={value.id_currency.name}
        symbol={value.id_currency.symbol}
        amount={'0.00000000'}
      />
    );
  }
  const [show, setShow] = useState(false);
  const handleClose = () => {
    chargeCurrencies()
    setShow(false)};
  const handleShow = () => setShow(true);

  console.log(items);
  return (
    <article className="message is-warning">
      <div className="message-header">
        <p>Wallet</p>
        <button
          className="button is-dark is-rounded is-small"
          onClick={handleShow}
        >
          Create Currency
        </button>
        <CurrencyModal show={show} handleClose={handleClose} />
      </div>
      <div className="message-body is-centered">
        <div className="columns is-multiline">{items}</div>
      </div>
    </article>
  );
}
export default WalletSection;
