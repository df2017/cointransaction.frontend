/**
    * @description      : 
    * @author           : Admin
    * @group            : 
    * @created          : 02/05/2021 - 20:39:16
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
import CustomInput from '../atoms/inputs/CustomInput';
import BlockUi from "react-block-ui";


function CurrencyModal({show, handleClose}) {

  const [blockCurrency, setBlockCurrency] = useState(false);

  const showHideClassName = show ? 'modal is-active' : 'modal';
  const alert = useAlert();

  const defaultValues = {
    name: '',
    symbol: '',
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
    setBlockCurrency(true)
    e.target.reset();
    const userSession = localStorage.getItem('user');
    const searchWallet = await InstanceAuth.get(
      `wallet/?name=${JSON.parse(userSession)[0].username}`
    );
    data.owner = JSON.parse(userSession)[0].id;
    if (searchWallet.status === 200) {
      const createResult = await InstanceAuth.post('currency/', data);
      if (createResult.status === 201) {
        setBlockCurrency(false)
        successCreateCurrency();
        handleClose();
      } else {
        setBlockCurrency(false)
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
        <BlockUi blocking={blockCurrency} message="Creating currency, please wait...">
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
              <CustomInput
                name="name"
                type="text"
                placeholder="Enter cryptocurrency name"
                register={register('name', {
                  required: {
                    value: true,
                    message: 'You must enter cryptocurrency name',
                  },
                })}
              />
              <p className="help is-danger mt-2 mb-2">{errors.name?.message}</p>
            </div>
            <div className="field">
              <label className="label">Symbol</label>
              <CustomInput
                name="symbol"
                type="text"
                placeholder="Enter cryptocurrency symbol"
                register={register('symbol', {
                  required: {
                    value: true,
                    message: 'You must enter cryptocurrency symbol',
                  },
                })}
              />
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
          </BlockUi>
        </form>
      </div>
    </div>
  );
}

export default CurrencyModal;
