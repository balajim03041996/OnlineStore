import { useCallback, useMemo, useState } from "react";
import EmployeeRow from "./EmployeeRow";



const initialEmployees = [
    { id: 1, name: "Ravi", dept: "IT", salary: 6000 },
    { id: 2, name: "mohan", dept: "HR", salary: 4500 },
    { id: 3, name: "hari", dept: "IT", salary: 2000 },
    { id: 4, name: "kishore", dept: "Sales", salary: 6030 },
    { id: 5, name: "vijay", dept: "Sales", salary: 4005 },
    { id: 6, name: "karthik", dept: "IT", salary: 6400 },
    { id: 7, name: "suman", dept: "HR", salary: 6300 },
    { id: 8, name: "arjun", dept: "HR", salary: 9000 }
];

const Depatrment = ["All", "IT", "HR", "Sales"];

const EmployeeDrill = () => {

    const [employee, setEmployee] = useState(initialEmployees);
    const [departmemt, setDepartment] = useState("All");
    const [dark, setDark] = useState(false);

    const filetred = useMemo(() => {
        return departmemt === "All" ? employee : employee.filter(x => x.dept === departmemt);
    }, [departmemt, employee]);

    const addTotal = useMemo(() => {
        return filetred.reduce((sum, x) => sum + x.salary, 0);
    }, [filetred]);

    const deleteEmployee = useCallback((Identity) => {
        console.log("deleted called");
        setEmployee(prev => prev.filter(x => x.id !== Identity));

    }, []);

    return (<div style={{ background: dark ? "#222" : "#fff", color: dark ? "#fff" : "#000" }}  >
        <p><button onClick={(e) => setDark(prev => !prev)} > change themme</button></p>
        <p>Total salary of {departmemt}: {addTotal}</p>
        <label> Department
            <select value={departmemt} onChange={(e) => setDepartment(e.target.value)} >
                {Depatrment.map(x => <option key={x}>{x}</option>)}
            </select>
        </label>
        <ul>
            {filetred.map((x) => <EmployeeRow key={x.id} emp={x} onDelete={deleteEmployee} />)}

        </ul>
    </div>);
};
export default EmployeeDrill; 