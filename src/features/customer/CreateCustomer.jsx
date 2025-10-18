import { useState } from "react";
import { ImUsers } from "react-icons/im";
import { ImQrcode } from "react-icons/im";
import { Bs1SquareFill } from "react-icons/bs";
import { Toaster, toast } from "react-hot-toast";
import { FiUserPlus } from "react-icons/fi";
import { createCustomer } from "./CustomerSlice";
import { useDispatch } from "react-redux";

function CreateCustomer() {
    const [fullName, setFullName] = useState("");
    const [nationalId, setNationalId] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    function handleClick() {
        const nameValue = fullName;
        const regex = /^[A-Za-z]{3,}$/;

        const fakeAPI = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!regex.test(nameValue)) reject("Invalid fullname value");
                else resolve("customer created successfully");
            }, 1500);
        });

        toast.promise(fakeAPI, {
            loading: "In progress ...",
            success: (message) => {
                setTimeout(() => {
                    dispatch(createCustomer(fullName, nationalId));
                    setFullName("");
                    setNationalId("");
                }, 700);
                return message;
            },
            error: (error) => {
                setError("Invalid full name value");
                setFullName("");
                setNationalId("");
                return error;
            },
        });
    }

    return (
        <div className="createCustomer">
            <span></span>
            <span></span>
            <h2>
                <Bs1SquareFill className="number" />
                <p>Create new customer</p>
            </h2>
            <div className="inputs inputs--customer">
                <div className="inputs__name">
                    <label htmlFor="name">
                        <ImUsers className="user" />
                        Customer full name
                    </label>
                    <input
                        id="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        autoComplete="off"
                        placeholder="Like 'Peter Parker'"
                    />
                    {error && <p className="error-message">{error}</p>}
                </div>
                <div className="inputs__nationalID">
                    <label htmlFor="nationalID">
                        <ImQrcode className="nationalID" />
                        National ID
                    </label>
                    <input
                        id="nationalID"
                        type="number"
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                        placeholder="0123456789"
                    />
                </div>
                <button onClick={handleClick}>
                    Create new customer <FiUserPlus className="plus-icon" />
                </button>
            </div>
            <Toaster
                toastOptions={{
                    style: {
                        fontSize: "1.5rem",
                        background: "#ffffffff",
                        color: "#0a0a0a",
                        padding: "1rem 2rem",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        textTransform: "capitalize",
                        fontFamily: "ComicNeue",
                        wordSpacing: "1.5px",
                        fontWeight: "bold",
                    },
                }}
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
}

export default CreateCustomer;
