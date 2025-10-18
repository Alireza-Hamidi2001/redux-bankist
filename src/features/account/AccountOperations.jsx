import { useState } from "react";
import { Bs2SquareFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { BiSolidRightArrowCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { ImWarning } from "react-icons/im";
import { FaCheck } from "react-icons/fa6";
import { BiSolidMessageError } from "react-icons/bi";

import Modal from "../modal/Modal";
import { loanRequest, payLoan, withdraw } from "./AccountSlice";

function AccountOperations() {
    const [depositAmount, setDepositAmount] = useState("");
    const [withdrawalAmount, setWithdrawalAmount] = useState("");
    const balance = useSelector((store) => store.account.balance);
    const loan = useSelector((store) => store.account.loan);
    const dispatch = useDispatch();
    const [loanAmount, setLoanAmount] = useState("");
    const [loanPurpose, setLoanPurpose] = useState("");
    const [currency, setCurrency] = useState("USD");

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showDoneModal, setShowDoneModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);

    const [requestLoanError, setRequestLoanError] = useState(false);
    const [requestLoanDone, setRequestLoanDone] = useState(false);

    const [loanDone, setLoanDone] = useState(false);

    const modalWarning = "modal__Warning";
    const modalDone = "modal__Done";
    const modalError = "modal__Error";

    function handleDeposit() {}

    function handleWithdrawal() {
        if (withdrawalAmount == "") {
            setShowDoneModal(false);
            setShowErrorModal(false);
            setShowWarningModal(true);
        } else if (withdrawalAmount > balance) {
            setShowDoneModal(false);
            setShowErrorModal(false);
            setShowErrorModal(true);
        } else if (withdrawalAmount <= balance) {
            dispatch(withdraw(withdrawalAmount));
            setShowErrorModal(false);
            setShowWarningModal(false);
            setShowDoneModal(true);
        }
        setWithdrawalAmount("");
    }

    function handleRequestLoan() {
        if (!loanAmount || !loanPurpose) {
            setRequestLoanError(true);
            return;
        }
        dispatch(loanRequest(loanAmount, loanPurpose));
        setRequestLoanDone(true);
        setLoanAmount("");
        setLoanPurpose("");
    }

    function handlePayLoan() {
        if (loan === 0) return;
        setLoanDone(true);
        dispatch(payLoan());
    }

    return (
        <div className="account__container">
            <h2>
                <Bs2SquareFill className="number" />
                <p>Your account operations</p>
            </h2>
            <div className="inputs inputs--account">
                <span></span>
                <span></span>
                <span></span>
                <div>
                    <label>
                        <GoDotFill className="acoount-list" />
                        <p>Deposit</p>
                    </label>
                    <input
                        type="number"
                        value={depositAmount}
                        placeholder="Deposit amount"
                        onChange={(e) => setDepositAmount(+e.target.value)}
                    />
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <option value="USD">US Dollar</option>
                        <option value="EUR">Euro</option>
                        <option value="GBP">British Pound</option>
                    </select>

                    <button onClick={handleDeposit}>
                        Deposit {depositAmount}
                        <BiSolidRightArrowCircle className="button-icon" />
                    </button>
                </div>

                <div className="two">
                    <label>
                        <GoDotFill className="acoount-list" />
                        Withdraw
                    </label>
                    <input
                        required
                        type="number"
                        value={withdrawalAmount}
                        placeholder="Withdraw amount"
                        onChange={(e) => setWithdrawalAmount(+e.target.value)}
                    />
                    <button onClick={handleWithdrawal}>
                        Withdraw {withdrawalAmount}
                        <BiSolidRightArrowCircle className="button-icon" />
                    </button>
                </div>

                <div>
                    <label>
                        <GoDotFill className="acoount-list" />
                        Request loan
                    </label>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(+e.target.value)}
                        placeholder="Loan amount"
                    />
                    <input
                        value={loanPurpose}
                        onChange={(e) => setLoanPurpose(e.target.value)}
                        placeholder="Loan purpose"
                    />
                    <button onClick={handleRequestLoan}>
                        Request loan{" "}
                        <BiSolidRightArrowCircle className="button-icon" />
                    </button>
                </div>

                <div>
                    <label htmlFor="payLoan">
                        {" "}
                        <GoDotFill className="acoount-list" />
                        Pay back {loan}
                    </label>
                    <button
                        id="payLoan"
                        onClick={handlePayLoan}
                    >
                        Pay loan
                        <BiSolidRightArrowCircle className="button-icon" />
                    </button>
                </div>
            </div>
            {/* Warning */}
            {showWarningModal && (
                <Modal modalType={modalWarning}>
                    <ImWarning />
                    <p>Withdraw should not be empty.</p>
                    <span onClick={() => setShowWarningModal(false)}>
                        &#10006;
                    </span>
                </Modal>
            )}
            {/* Error */}
            {showErrorModal && (
                <Modal modalType={modalError}>
                    <FaCheck />
                    <p>Your balance is not enough.</p>
                    <span onClick={() => setShowErrorModal(false)}>
                        &#10006;
                    </span>
                </Modal>
            )}
            {/* Done */}
            {showDoneModal && (
                <Modal modalType={modalDone}>
                    <BiSolidMessageError />
                    <p>Operation done successfully.</p>
                    <span onClick={() => setShowDoneModal(false)}>
                        &#10006;
                    </span>
                </Modal>
            )}
            {requestLoanDone && (
                <Modal modalType={modalDone}>
                    <BiSolidMessageError />
                    <p>Request sent successfully.</p>
                    <span onClick={() => setRequestLoanDone(false)}>
                        &#10006;
                    </span>
                </Modal>
            )}
            {requestLoanError && (
                <Modal modalType={modalError}>
                    <BiSolidMessageError />
                    <p>fill out all inputs in request loan.</p>
                    <span onClick={() => setRequestLoanError(false)}>
                        &#10006;
                    </span>
                </Modal>
            )}
            {loanDone && (
                <Modal modalType={modalDone}>
                    <BiSolidMessageError />
                    <p>Pay loan back successfully.</p>
                    <span onClick={() => setLoanDone(false)}>&#10006;</span>
                </Modal>
            )}
        </div>
    );
}

export default AccountOperations;
