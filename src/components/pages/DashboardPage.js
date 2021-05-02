/**
    * @description      : 
    * @author           : Admin
    * @group            : 
    * @created          : 01/05/2021 - 20:46:42
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/05/2021
    * - Author          : Admin
    * - Modification    : 
**/
import React from "react";
import NavBar from "../organisms/Navbar";
import { AccountSection } from "../organisms/AccountSection";
import WalletSection from "../organisms/WalletSection";
import TransactionSection from "../organisms/TransactionSection";

function DashboardPage() {
  //const [posts, setPosts] = useState(null);
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <section>
        <div className="container is-centered">
          <div className="column is-12">
            <AccountSection />
          </div>
          <div className="column is-12">
            <WalletSection />
          </div>
          <div className="column is-12">
            <TransactionSection />
          </div>
        </div>
      </section>
      <footer></footer>
    </div>
  );
}

export default DashboardPage;
