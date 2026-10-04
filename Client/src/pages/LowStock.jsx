import { useState } from "react";
import { getLowStock } from "../api/lowStockApi";


const LowStock = () => {
    const [threshold, SetThreshold] = useState(20);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [checked, setChecked] = useState(false);

    const handleCheck = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getLowStock(threshold);
            setItems(data);
            setChecked(true);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-card">
            <h2>Low stock Reports</h2>
            <labell>Show products with stock below
                < input type="number" value={threshold} onChange={(e) => SetThreshold(e.target.value)} input />
            </labell>
            <button onClick={handleCheck} disabled={loading}>
                {loading ? "checking..." : "Check stock"}
            </button>
            {error && <p className="form-error">{error}</p>}
            {checked && items.length == 0 && <p>All products have enough stock 👍</p>}
            {items.map((x) => <p key={x.id}> {x.name}:{x.stockQuantity} left</p>)}
        </div>
    );
};
export default LowStock;

