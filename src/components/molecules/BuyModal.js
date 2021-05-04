/**
 * @description      :
 * @author           : Admin
 * @group            :
 * @created          : 02/05/2021 - 21:41:47
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 02/05/2021
 * - Author          : Admin
 * - Modification    :
 **/
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useAlert} from 'react-alert';
import {InstanceAuth} from '../../services/BaseInstance';
import {$amount} from '../organisms/AccountSection';
import AmountInput from '../atoms/inputs/AmountInput';
import AmountCurrencyInput from '../atoms/inputs/AmountCurrencyInput';
import {AmountTotalCurrency} from '../molecules/CurrencyBlock';
import BlockUi from "react-block-ui";

function BuyModal({show, handleClose, currency}) {

  const [blockBuy, setBlockBuy] = useState(false);

  const showHideClassName = show ? 'modal is-active' : 'modal';
  const alert = useAlert();

  const [currencyValue, setCurrencyValue] = useState(0);
  const defaultValues = {
    amount: 0,
    amountCurrency: 0,
  };

  const pricesCurrencies = [
    {value: 57984.37, currency: 'BTC'},
    {value: 3013.82, currency: 'ETH'},
    {value: 274.03, currency: 'LTC'},
    {value: 1, currency: 'DAI'},
  ];

  const {
    register,
    handleSubmit,
    formState: {errors},
    formState,
  } = useForm({
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const alertBuyCurrency = () => {
    alert.error('Error. Transaction canceled!');
  };

  const successBuyCurrency = () => {
    alert.success('Congratulations, Buy successful!!');
  };

  const onSubmit = async (data, e) => {
    setBlockBuy(true)
    data.amountCurrency = currencyValue;
    e.target.reset();
    setCurrencyValue(0);
    const userSession = localStorage.getItem('user');
    const user = JSON.parse(userSession)[0].id;
    const addressResult = await InstanceAuth.get(
      `currency/?symbol=${currency}&owner=${user}`
    );
    const dataTx = {};
    const dataTxOut = {};
    //****************************************************************** */
    const searchWallet = await InstanceAuth.get(
      `wallet/?name=${JSON.parse(userSession)[0].username}`
    );

    if (searchWallet.status === 200) {
      if (searchWallet.data.results[0].amount !== null) {
        data.amount =
          parseFloat(searchWallet.data.results[0].amount) -
          parseFloat(data.amount);
        $amount.next(data.amount);
      }
      const result = await InstanceAuth.patch(
        `wallet/${searchWallet.data.results[0].id}/`,
        data
      );
      if (result.status === 200) {
        const resultCountTx = await InstanceAuth.get('transactions/');
        if (resultCountTx.status === 200) {
          if (resultCountTx.data.count === 0) {
            dataTx.isCoinbase = true;
          } else {
            dataTx.isCoinbase = false;
          }
          dataTx.out_total = data.amountCurrency;
          dataTx.in_total = 0;
          dataTx.hash_tx = 'xccxx';
          const resulCreateTx = await InstanceAuth.post(
            'transactions/',
            dataTx
          );
          if (resulCreateTx.status === 201) {
            dataTxOut.transaction_id = resulCreateTx.data;
            dataTxOut.hash_txOut = 'xcvvx';
            dataTxOut.index = 0;
            dataTxOut.address = addressResult.data.results[0].address;
            dataTxOut.amount = data.amountCurrency;
            dataTxOut.type_coin = currency;
            dataTxOut.spent = false;
            const resultCreateTxOut = await InstanceAuth.post(
              'transactionsout/',
              dataTxOut
            );
            if (resultCreateTxOut.status === 201) {
              AmountTotalCurrency(addressResult.data.results[0].address, currency)
              $amount.next(data.amount);
              setBlockBuy(false)
              successBuyCurrency();
              handleClose();
            } else {
              setBlockBuy(false)
              alertBuyCurrency();
              handleClose();
            }
          }
        }
      }
    }
  };

  const handleChange = (event) => {
    const priceCrypto = pricesCurrencies.find(
      (item) => item.currency === currency
    ).value;
    const price = event.target.value / priceCrypto;
    setCurrencyValue(price.toFixed(8));
  };

  return (
    <div className={showHideClassName}>
      <div className="modal-background" onClick={handleClose} />
      <div className="modal-card">
        <form onSubmit={handleSubmit(onSubmit)} className="m-3">
        <BlockUi blocking={blockBuy} message="Buying, please wait...">
          <header className="modal-card-head">
            <p className="modal-card-title">Buy Criptocurrency</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handleClose}
              type="button"
            />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">USD</label>
              <AmountInput
                event={handleChange}
                register={register('amount', {
                  required: {
                    value: true,
                    message: 'You must enter a number',
                  },
                })}
              />
              <h6>Enter the amount you want to buy</h6>
              <p className="help is-danger mt-2 mb-2">
                {errors.amount?.message}
              </p>
            </div>
            <div className="field">
              <label className="label">{currency}</label>
              <AmountCurrencyInput
                event={currencyValue}
                register={register('amountCurrency', {
                  required: {
                    value: true,
                    message: 'You must enter a number',
                  },
                })}
              />
            </div>
          </section>
          <footer className="modal-card-foot">
            <button
              type="submit"
              className="button is-success"
              disabled={!formState.isValid}
            >
              Buy
            </button>
            <button className="button" type="button" onClick={handleClose}>
              Cancel
            </button>
          </footer>
          </BlockUi>
        </form>
      </div>
    </div>
  );
}

export default BuyModal;
