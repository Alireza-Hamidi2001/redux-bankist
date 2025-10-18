import AccountOperations from "./features/account/AccountOperations";
import BalanceDisplay from "./features/account/BalanceDisplay";
import CreateCustomer from "./features/customer/CreateCustomer";
import Customer from "./features/customer/Customer";
import Footer from "./Footer.jsx";
import logoImage from "./assets/images/alireza4.png";
import { useSelector } from "react-redux";

function App() {
    const fullName = useSelector((store) => store.customer.fullName);

    return (
        <>
            <h1>
                <img
                    src={logoImage}
                    className="logo"
                    alt="Logo image"
                />
                The React-Redux Bank
            </h1>
            <div className="app">
                {fullName === "" ? (
                    <div className="app__inputs">
                        <CreateCustomer />
                    </div>
                ) : (
                    <>
                        <div className="app__inputs">
                            <AccountOperations />
                        </div>
                        <BalanceDisplay />
                        <Customer />
                    </>
                )}
            </div>
            <Footer />
        </>
    );
}

export default App;
