/**
 * @description      :
 * @author           : Admin
 * @group            :
 * @created          : 03/05/2021 - 09:52:33
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 03/05/2021
 * - Author          : Admin
 * - Modification    :
 **/
import React, {useState, useEffect} from 'react';
import {InstanceAuth} from '../../services/BaseInstance';


function TransactionOutTable() {
  const [itemsOut, SetItemOut] = useState([])
 
  useEffect(() => {
    InstanceAuth.get('transactionsout/').then((resp) => {
      if (resp.status === 200) {
        SetItemOut(resp.data.results);
      }
    });
  },[]);

  return (
    <article className="message is-info">
      <div className="message-header">
        <p className="mt-1 mb-1">Transactions OUT</p>
      </div>
      <div className="message-body is-centered">
        <div className="table-container">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Address</th>
                <th>Amount</th>
                <th>Type_coin</th>
                <th>Spent</th>
                <th>Hash_txOut</th>
                <th>Transaction_id</th>
              </tr>
            </thead>
            <tbody>
              {itemsOut.map((value, index) => (
                <tr key={index}>
                  <td>{value.address}</td>
                  <td>{value.amount}</td>
                  <td>{value.type_coin}</td>
                  <td>{value.spent ? 'Spent' : 'Unspent'}</td>
                  <td>{value.hash_txOut}</td>
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
export {TransactionOutTable};
