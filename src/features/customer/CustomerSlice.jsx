const customerInitialState = {
    fullName: "",
    nationalID: "",
    createdAt: "",
};

// customer reducer
export function customerReducer(state = customerInitialState, action) {
    switch (action.type) {
        case "customer/createCustomer":
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt,
            };
        case "customer/updateName":
            return { ...state, fullName: action.payload.fullName };
        default:
            return state;
    }
}

// action creators
export function createCustomer(fullName, nationalID) {
    return {
        type: "customer/createCustomer",
        payload: {
            fullName,
            nationalID,
            createdAt: new Date().toLocaleString,
        },
    };
}
export function updateName(fullName) {
    return {
        type: "updateName",
        payload: { fullName },
    };
}
