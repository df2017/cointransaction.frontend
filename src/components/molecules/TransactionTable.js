/**
 * @description      :
 * @author           : Admin
 * @group            :
 * @created          : 03/05/2021 - 09:25:49
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 03/05/2021
 * - Author          : Admin
 * - Modification    :
 **/
import React, {useState, useEffect} from 'react';
import {InstanceAuth} from '../../services/BaseInstance';
import {BehaviorSubject} from 'rxjs';

const transacionRows$ = new BehaviorSubject([]);

function TransactionTable() {
  const [items, SetItem] = useState([])
  
  useEffect(() => {
    InstanceAuth.get('transactions/').then((resp) => {
      if (resp.status === 200) {
        SetItem(resp.data.results);
      }
    });
  },[]);

  return (
    <article className="message is-info">
      <div className="message-header">
        <p className="mt-1 mb-1">Transactions Principal</p>
      </div>
      <div className="message-body is-centered">
        <div className="table-container">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Hash Tx</th>
                <th>In Total</th>
                <th>Out Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((value, index) => (
                <tr key={index}>
                  <td>{value.hash_tx}</td>
                  <td>{value.in_total}</td>
                  <td>{value.out_total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  );
}
export {TransactionTable, transacionRows$};
