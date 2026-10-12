import { useState } from "react";


const ShoppingDrill = () => {

    const [item, setItem] = useState("");
    const [shoppingList, setShoppingList] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const addItemToList = (event) => {
        event.preventDefault();
        if (item.trim() === "")
            return;
        if (!(quantity >= 1))// nan , 1 give false so flip
            return;
        setShoppingList([...shoppingList, { id: Date.now(), name: item, count: quantity, bought: false }]);
        setItem("");// to make input check empty after update
        setQuantity(1);
    };

    const deleteItem = (Id) => {
        setShoppingList(shoppingList.filter(x => x.id !== Id));
    };

    const broughItem = (Id) => {
        setShoppingList(shoppingList.map(x => x.id === Id ? { ...x, bought: !x.bought } : x));
    };

    return (<form onSubmit={(e) => addItemToList(e)} className="form-card">
        <label> item
            <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
            <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(e.target.valueAsNumber)} />
        </label>
        <button >Add item</button>
        <ul>
            {shoppingList.map((x) =>
                <li key={x.id} >
                    <span style={{ textDecoration: x.bought ? "line-through" : "none" }}>
                        {x.name} * {x.count}
                    </span>

                    <button type="button" onClick={() => deleteItem(x.id)} > Remove</button >
                    <button type="button" onClick={() => broughItem(x.id)}  > Bought </button>
                </li>)}
        </ul>
    </form >);

};
export default ShoppingDrill;