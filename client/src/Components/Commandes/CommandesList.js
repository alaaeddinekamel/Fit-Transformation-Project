import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../Redux/Actions/OrderActions";
import CommandeCard from "./CommandeCard";

const CommandesList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    const orders = useSelector(state => state.orderReducer.orders);

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 flex flex-col" style={{ width : '100%'}}>
                {orders.map((order) => (
                    <div className="col" key={order._id}>
                        <CommandeCard order={order} />
                    </div>
                ))}
            </div>
        </div>
        
    
    );
};

export default CommandesList;
