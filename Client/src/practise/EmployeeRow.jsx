import { memo } from "react";


const EmployeeRow = memo(({ emp, onDelete }) => {
    console.log("row", emp.id)

    return (<li>
        {emp.name} {emp.dept} {emp.salary}
        <button type="button" onClick={(e) => onDelete(emp.id)} >
            remove
        </button>
    </li>);

});
export default EmployeeRow;