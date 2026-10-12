import { useEffect, useState } from "react";



const UserDrill = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        const controller = new AbortController();
        const loadUser = async () => {
            try {
                const res = await
                    fetch("https://jsonplaceholder.typicode.com/users", { signal: controller.signal });
                if (!res.ok) {
                    throw new Error("HTTP " + res.status);
                }
                const data = await res.json();
                setUserList(data);
            }
            catch (err) {
                if (err.name === "AbortError")
                    return;
                setError(err.message);
            }
            finally {
                if (!controller.signal.aborted)
                    setLoading(false);
            }
        };
        loadUser();
        return () => controller.abort();
    }, []);

    if (loading) {
        return <p> Loading...</p>
    }
    else if (error) {
        return (<p>Error:{error} </p>);
    }
    else if (userList.length > 0) {
        return <div>
            <ul>
                {userList.map((x) => <li key={x.id} >{x.name}</li>)}
            </ul>
        </div>
    }
    else {
        return <p>No user found</p>
    }
};
export default UserDrill;