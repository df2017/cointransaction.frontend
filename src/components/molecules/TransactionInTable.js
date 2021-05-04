/**
 * @description      :
 * @author           : Admin
 * @group            :
 * @created          : 03/05/2021 - 11:45:21
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 03/05/2021
 * - Author          : Admin
 * - Modification    :
 **/
import React, {useState, useEffect} from 'react';
import {InstanceAuth} from '../../services/BaseInstance';


function TransactionInTable() {
  const [itemsIn, SetItemIn] = useState([])

  useEffect(() => {
    InstanceAuth.get('transactionsin/').then((resp) => {
      if (resp.status === 200) {
        console.log(resp.data.results)
        SetItemIn(resp.data.results);
      }
    });
  },[]);

  return (
    <article className="message is-info">
      <div className="message-header">
        <p className="mt-1 mb-1">Transactions IN</p>
      </div>
      <div className="message-body is-centered">
        <div className="table-container">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Type_coin</th>
                <th>Amount</th>
                <th>hash_txIn</th>
                <th>transaction_id</th>
              </tr>
            </thead>
            <tbody>
            {itemsIn.map((value, index) => (
                <tr key={index}>
                  <td>{value.type_coin}</td>
                  <td>{value.amount}</td>
                  <td>{value.hash_txIn}</td>
                  <td>{value.transaction_id.hash_tx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  );
}
export {TransactionInTable};
