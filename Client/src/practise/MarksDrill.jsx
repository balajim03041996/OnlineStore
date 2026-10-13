import { useState } from "react";



const MarksDrill = () => {

    const [studentName, setStudentName] = useState("");

    const [studentMark, setStudentMark] = useState(0);

    const [studentData, setStudentData] = useState([]);

    const updateStudentData = (e) => {
        e.preventDefault();
        if (studentName.trim() === "")
            return;
        setStudentData([...studentData, { id: Date.now(), name: studentName, mark: studentMark, result: studentMark >= 35 ? "pass" : "fail" }]);
        setStudentName("");
        setStudentMark(0);
    }
    const deletedStudentData = (Id) => {
        setStudentData(studentData.filter(x => x.id !== Id));
    };

    const updateStudentmark = (Id) => {
        setStudentData(studentData.map(x => (x.id === Id) ? { ...x, mark: x.mark + 5 } : x));
    };

    const passCount = studentData.filter(x => x.mark > 34).length;

    return (<form onSubmit={(e) => updateStudentData(e)} className="form-card">Student Details
        passed : {passCount}/{studentData.length}
        <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
        <input type="Number" min={0} max={100} value={studentMark} onChange={(e) => setStudentMark(e.target.valueAsNumber)} />
        <button   > Add </button>
        <ul>
            {studentData.map((x) =>
                <li key={x.id} >
                    {x.name}-{x.mark}-{x.mark > 34 ? "Pass " : "fail "}
                    {x.mark < 96 ? <button type="button" onClick={(e) => updateStudentmark(x.id, e)} >+5</button> : ""}
                    <button type="button" onClick={(e) => deletedStudentData(x.id, e)} >Delete </button>
                </li>)}
        </ul>
    </form>);


};
export default MarksDrill;