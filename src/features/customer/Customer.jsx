import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

function Customer() {
    const fullName = useSelector((store) => store.customer.fullName);
    return (
        <h2 className="welcome">
            <FaUser className="userCheck" /> Welcome , <span>{fullName}</span>
        </h2>
    );
}

export default Customer;
