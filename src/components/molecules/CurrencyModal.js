/**
 * @description      :
 * @author           : Admin
 * @group            :
 * @created          : 02/05/2021 - 13:14:59
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 02/05/2021
 * - Author          : Admin
 * - Modification    :
 **/
import React from 'react';
import {useForm} from 'react-hook-form';
import {useAlert} from 'react-alert';
import {InstanceAuth} from '../../services/BaseInstance';
import Select from 'react-select';

function CurrencyModal({show, handleClose}) {
  const optionsName = [
    {value: "BTC", label: 'Bitcoin'},
    {value: "ETH", label: 'Ethereum'},
    {value: "LTC", label: 'Litecoin'},
    {value: "DAI", label: 'Dai'},
  ];

  const showHideClassName = show ? 'modal is-active' : 'modal';
  const alert = useAlert();

  const defaultValues = {
    name: '',
    enabled: '',
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

  const alertCreateCurrency = () => {
    alert.error('Error creating cryptocurrency');
  };

  const successCreateCurrency = () => {
    alert.success('Crytocurrency created!');
  };

  const onSubmit = async (data, e) => {
    e.target.reset();
    const userSession = localStorage.getItem('user');
    const searchWallet = await InstanceAuth.get(
      `wallet/?name=${JSON.parse(userSession)[0].username}`
    );
    data.owner = JSON.parse(userSession)[0].id;
    data.symbol = data.name;
    data.name = optionsName.find(items => items.value === data.name).label;
    if (searchWallet.status === 200) {
      const createResult = await InstanceAuth.post('currency/', data);
      if (createResult.status === 201) {
        successCreateCurrency();
        handleClose();
      } else {
        handleClose();
      }
    } else {
      alertCreateCurrency();
      handleClose();
    }
  };

  return (
    <div className={showHideClassName}>
      <div className="modal-background" onClick={handleClose} />
      <div className="modal-card">
        <form onSubmit={handleSubmit(onSubmit)} className="m-3">
          <header className="modal-card-head">
            <p className="modal-card-title">Create Criptocurrency</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handleClose}
              type="button"
            />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Name</label>
              <div class="select">
                <select
                  {...register('name', {
                    required: {
                      value: true,
                      message: 'You must enter a name',
                    },
                  })}
                >
                  {optionsName.map((item) => (
                    <option value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <p className="help is-danger mt-2 mb-2">{errors.name?.message}</p>
            </div>
            <div className="field">
              <label className="label">Enabled</label>
              <input name="enabled" type="checkbox" {...register('enabled')} />
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

export default CurrencyModal;
