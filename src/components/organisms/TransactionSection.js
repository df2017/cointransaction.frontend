/**
    * @description      : 
    * @author           : Admin
    * @group            : 
    * @created          : 03/05/2021 - 09:25:08
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/05/2021
    * - Author          : Admin
    * - Modification    : 
**/
import React from "react";
import {TransactionTable} from "../molecules/TransactionTable";
import {TransactionOutTable} from "../molecules/TransactionsOutTable";
import {TransactionInTable} from "../molecules/TransactionInTable";


function TransactionSection() {
  return (
    <article className="message is-dark">
      <div className="message-header">
        <p className="mt-1 mb-1">Register Transactions</p>
      </div>
      <div className="message-body is-centered">
        <TransactionTable />
        <TransactionOutTable />
        <TransactionInTable />
      </div>
    </article>
  );
}
export default TransactionSection;