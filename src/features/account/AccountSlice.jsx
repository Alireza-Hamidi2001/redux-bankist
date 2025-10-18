import { createSlice } from "@reduxjs/toolkit";
// const accountInitialState = {
//     balance: 1942,
//     loan: null,
//     loanPurpose: "",
// };
const initialState = {
    balance: 1942,
    loan: null,
    loanPurpose: "",
    isLoading: false,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw(state, action) {
            state.balance -= action.payload;
        },
        loanRequest: {
            prepare(amount, purpose) {
                return { payload: { amount, purpose } };
            },
            reducer(state, action) {
                if (state.loan > 0) return;
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance += action.payload.amount;
            },
        },
        payLoan(state) {
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        },
        convertCurrency(state) {
            state.isLoading = true;
        },
    },
});

export const { withdraw, loanRequest, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
    if (currency === "USD") return { type: "account/deposit", payload: amount };
    return async function (dispatch, getState) {
        // API CALL
        const res = await fetch(
            `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`,
        );
        const data = await res.json();
        const convertedAmount = (amount * data.rates["USD"]).toFixed(2);
        console.log(`${amount} ${currency} = ${convertedAmount} USD`);
        console.log(data);

        // RETURN ACTION
        dispatch({ type: "account/deposit", payload: +convertedAmount });
    };
}
export default accountSlice.reducer;

console.log(accountSlice);

////////////////////////     REDUCER     ////////////////////
// export function accountReducer(state = accountInitialState, action) {
//     switch (action.type) {
//         case "account/deposit":
//             return {
//                 ...state,
//                 balance: state.balance + action.payload,
//             };
//         case "account/withdraw":
//             return {
//                 ...state,
//                 balance: state.balance - action.payload,
//             };
//         // -??-
//         case "account/requestLoan":
//             if (state.loan > 0) return state;
//             return {
//                 ...state,
//                 loan: action.payload.amount,
//                 loanPurpose: action.payload.purpose,
//                 balance: state.balance + action.payload.amount,
//             };
//         case "account/payLoan":
//             return {
//                 ...state,
//                 loan: 0,
//                 loanPurpose: "",
//                 balance: state.balance - state.loan,
//             };
//         default:
//             return state;
//     }
// }

// ////////////////////////     ACTION CREATOR     ////////////////////
// export function deposit(amount, currency) {
//     if (currency === "USD") return { type: "account/deposit", payload: amount };
//     else {
//         alert("I will do it later ...");
//     }
// }
// export function withdraw(amount) {
//     return { type: "account/withdraw", payload: amount };
// }
// export function loanRequest(amount, purpose) {
//     return {
//         type: "account/requestLoan",
//         payload: { amount: amount, purpose: purpose },
//     };
// }
// export function payLoan() {
//     return { type: "account/payLoan" };
// }
