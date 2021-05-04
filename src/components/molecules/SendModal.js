/**
 * @description      :
 * @author           : Admin
 * @group            :
 * @created          : 02/05/2021 - 21:43:47
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 02/05/2021
 * - Author          : Admin
 * - Modification    :
 **/
import React, {useState} from 'react';
import {InstanceAuth} from '../../services/BaseInstance';
import AmountInput from '../atoms/inputs/AmountInput';
import CustomInput from '../atoms/inputs/CustomInput';
import {useForm} from 'react-hook-form';
import {useAlert} from 'react-alert';
import {AmountTotalCurrency} from '../molecules/CurrencyBlock';
import BlockUi from "react-block-ui";


const UpdateTxUnspent = async (address, coin, txIn) => {
  const body = {
    spent: true,
    hash_txIn: txIn,
  };
  const addressResult = await InstanceAuth.get(
    `transactionsout/?spent=false&address=${address}&type_coin=${coin}`
  );
  addressResult.data.results.map(async (value) => {
    await InstanceAuth.patch(`transactionsout/${value.id}/`, body);
  });
};

function SendModal({show, handleClose, currency}) {

  const [blockSend, setBlockSend] = useState(false);

  const showHideClassName = show ? 'modal is-active' : 'modal';
  const alert = useAlert();

  const defaultValues = {
    amount: 0,
    address: '',
  };

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

  const alertSendCurrency = () => {
    alert.error('Error. Transaction canceled!');
  };

  const successSendCurrency = () => {
    alert.success('Sending successful!!');
  };

  const onSubmit = async (data, e) => {
    setBlockSend(true)
    e.target.reset();

    const userSession = localStorage.getItem('user');
    const user = JSON.parse(userSession)[0].id;
    const addressResult = await InstanceAuth.get(
      `currency/?symbol=${currency}&owner=${user}`
    );

    const dataTx = {};
    const dataTxOutOne = {};
    const dataTxOutTwo = {};
    const dataTxIn = {};
    if (addressResult.status === 200) {
      const myAddress = addressResult.data.results[0].address;

      //****************************************************************** */
      const resultCountTx = await InstanceAuth.get('transactions/');

      if (resultCountTx.status === 200) {
        if (resultCountTx.data.count === 0) {
          dataTx.isCoinbase = true;
        } else {
          dataTx.isCoinbase = false;
        }
        const totalCurrency = await AmountTotalCurrency(myAddress, currency);
        
        dataTx.out_total = totalCurrency;
        dataTx.in_total = totalCurrency;
        dataTx.hash_tx = 'xccxx';

        const amountOutMy = totalCurrency - parseFloat(data.amount);
        const amountOther = parseFloat(data.amount);
        //create transaction principal
        const resulCreateTx = await InstanceAuth.post('transactions/', dataTx);

        if (resulCreateTx.status === 201) {
          dataTxIn.hash_txIn = myAddress;
          dataTxIn.transaction_id = resulCreateTx.data;
          dataTxIn.index = 0;
          dataTxIn.amount = totalCurrency;
          dataTxIn.type_coin = currency;

          const resultCreateTxIn = await InstanceAuth.post(
            'transactionsin/',
            dataTxIn
          );
          await UpdateTxUnspent(myAddress, currency, resultCreateTxIn.data.hash_txIn);

          if (resultCreateTxIn.status === 201) {
            dataTxOutOne.transaction_id = resulCreateTx.data;
            dataTxOutOne.hash_txOut = 'xcvvx';
            dataTxOutOne.index = 0;
            dataTxOutOne.address = myAddress;
            dataTxOutOne.amount = amountOutMy.toFixed(8);
            dataTxOutOne.type_coin = currency;
            dataTxOutOne.spent = false;
            const resultCreateTxOutOne = await InstanceAuth.post(
              'transactionsout/',
              dataTxOutOne
            );

            if (resultCreateTxOutOne.status === 201) {
              dataTxOutTwo.transaction_id = resulCreateTx.data;
              dataTxOutTwo.hash_txOut = 'xcvvx';
              dataTxOutTwo.index = 1;
              dataTxOutTwo.address = data.address;
              dataTxOutTwo.amount = amountOther.toFixed(8);
              dataTxOutTwo.type_coin = currency;
              dataTxOutTwo.spent = false;
              const resultCreateTxOutTwo = await InstanceAuth.post(
                'transactionsout/',
                dataTxOutTwo
              );
              if (resultCreateTxOutTwo.status === 201) {
                setBlockSend(false)
                successSendCurrency();
                handleClose();
              } else {
                setBlockSend(false)
                alertSendCurrency();
                handleClose();
              }
            }
          }
        }
      }
    } else {
      setBlockSend(false)
    }
  };

  return (
    <div className={showHideClassName} >
      <div className="modal-background" onClick={handleClose} />
      <div className="modal-card">
        <form onSubmit={handleSubmit(onSubmit)} className="m-3">
        <BlockUi blocking={blockSend} message="Sending, please wait...">
          <header className="modal-card-head">
            <p className="modal-card-title">Send Criptocurrency</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handleClose}
              type="button"
            />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Amount</label>
              <AmountInput
                register={register('amount', {
                  required: {
                    value: true,
                    message: 'You must enter a number',
                  },
                })}
              />
              <h6>Enter the amount you want to send</h6>
              <p className="help is-danger mt-2 mb-2">
                {errors.amount?.message}
              </p>
            </div>
            <div className="field">
              <label className="label">Address</label>
              <CustomInput
                placeholder="Enter an address"
                type="text"
                name="address"
                register={register('address', {
                  required: {
                    value: true,
                    message: 'You must enter a address',
                  },
                })}
              />
              <p className="help is-danger mt-2 mb-2">
                {errors.address?.message}
              </p>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button
              type="submit"
              className="button is-success"
              disabled={!formState.isValid}
            >
              Send
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

export default SendModal;
