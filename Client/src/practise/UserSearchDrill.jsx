import { useEffect, useState } from "react";



const UserSearchDrill = () => {
    const [user, setUser] = useState("");
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchData = async (signal) => {
        try {
            setLoading(true);
            const response = await fetch(`https://dummyjson.com/users/search?q=${user}`, { signal });
            if (response.ok) {

                const jsonResponse = await response.json();
                setUserData(jsonResponse.users);
            }
        }
        catch (err) {
            if (err.name === "AbortError")
                return;
            console.log(err.message);
        }
        finally {
            if (!signal.aborted)
                setLoading(false);
        }

    };


    useEffect(() => {
        const controller = new AbortController();
        if (user.trim() === "") {
            setUserData([]);
            setLoading(false);
            return;
        }
        const debounce = setTimeout(() => {
            searchData(controller.signal);
        }, 500);
        return () => {
            clearTimeout(debounce);
            controller.abort();
        }
    }, [user])


    return (<div >User Search
        <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
        {/* list: only when we have users */}
        {userData.length > 0 && (
            <ul>
                {userData.map((x) =>
                    <li key={x.id}>
                        {x.firstName} {x.lastName} - {x.email}
                    </li>)}
            </ul>
        )}
        {/* no results: search finished, box not empty, nothing found */}
        {!loading && user.trim() !== "" && userData.length === 0 && <p>No users found</p>}
        {loading && <p>Loading...</p>}

    </div>);

};
export default UserSearchDrill;