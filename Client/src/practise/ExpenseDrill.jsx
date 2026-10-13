import { useState } from "react";



const ExpenseDrill = () => {


    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState(0);
    const [Expense, setExpense] = useState([]);

    const updateExpense = (e) => {

        e.preventDefault();
        if (title.trim() === "" || amount < 1)
            return;
        setExpense([...Expense, { id: Date.now(), expenseName: title, expenseAmount: amount, amountPaid: false }]);
        setAmount(0);
        setTitle("")
    };

    const deleteExpense = (Id) => {
        setExpense(Expense.filter(x => x.id !== Id));
    };

    const updatePayment = (Id) => {
        setExpense(Expense.map(x => (x.id === Id) ? { ...x, amountPaid: !x.amountPaid } : x));
    };
    const totalExpenseAmount = Expense.reduce((sum, x) => sum + x.expenseAmount, 0);

    const unPaidAmount = Expense.reduce((sum, x) => sum + (x.amountPaid ? 0 : x.expenseAmount), 0);


    return (<form onSubmit={(e) => updateExpense(e)}  >Expense Tracker
        <div> Total : {totalExpenseAmount} and unpaid: {unPaidAmount} </div>

        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="number" value={amount} min={0} onChange={(e) => setAmount(e.target.valueAsNumber)} />
        <button > Add expense</button>
        <ul>

            {Expense.map((x) => <li key={x.id} >
                <span style={{ color: x.amountPaid ? "grey" : "inherit" }} > {x.expenseName}--{x.expenseAmount}
                </span>
                <button type="button" onClick={() => updatePayment(x.id)} >paid</button>
                <button type="button" onClick={() => deleteExpense(x.id)}>Delete</button>
            </li>)}
        </ul>

    </form>);
};
export default ExpenseDrill;