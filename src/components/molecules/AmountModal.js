/**
 * @description      :
 * @author           : Admin
 * @group            :
 * @created          : 02/05/2021 - 01:38:38
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 02/05/2021
 * - Author          : Admin
 * - Modification    :
 **/
import React from 'react';
import {useForm} from 'react-hook-form';
import AmountInput from '../atoms/inputs/AmountInput';
import {useAlert} from 'react-alert';
import {InstanceAuth} from '../../services/BaseInstance';
import {$amount} from '../organisms/AccountSection';

function AccountModal({show, handleClose}) {
  const showHideClassName = show ? 'modal is-active' : 'modal';
  const alert = useAlert();

  const defaultValues = {
    amount: '',
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

  const alertRegister = () => {
    alert.error('Error loading amount!');
  };

  const successRegister = () => {
    alert.success('Deposit ok!!!');
  };

  const onSubmit = async (data, e) => {
    e.target.reset();
    const userSession = localStorage.getItem('user');
    const searchWallet = await InstanceAuth.get(
      `wallet/?name=${JSON.parse(userSession)[0].username}`
    );

    if (searchWallet.status === 200) {
      if (searchWallet.data.results[0].amount !== null) {
        data.amount =
          parseFloat(data.amount) +
          parseFloat(searchWallet.data.results[0].amount);
      }
      const result = await InstanceAuth.patch(
        `wallet/${searchWallet.data.results[0].id}/`,
        data
      );
      if (result.status === 200) {
        $amount.next(data);
        successRegister();
        handleClose();
      }
    } else {
      alertRegister();
    }
  };

  return (
    <div className={showHideClassName}>
      <div className="modal-background" onClick={handleClose} />
      <div className="modal-card">
        <form onSubmit={handleSubmit(onSubmit)} className="m-3">
          <header className="modal-card-head">
            <p className="modal-card-title">Deposit Cash</p>
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
              <p className="help is-danger mt-2 mb-2">
                {errors.amount?.message}
              </p>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button
              type="submit"
              className="button is-success"
              disabled={!formState.isValid}
            >
              Save
            </button>
            <button className="button" type="button" onClick={handleClose}>
              Cancel
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default AccountModal;
