import { memo, useCallback, useMemo, useState } from "react";

const Products = ["laptop", "mouse", "keyboard", "speaker", "headphones", "tablettand"];

const ClearButton = memo(({ onClear }) => {
    //console.log("ClearButton  rendered");
    return <button type="button" onClick={onClear}> Clear</button>
});


const MemoDrill = () => {

    const [search, setSearch] = useState("");
    const [count, setCount] = useState(0);

    const filterProducts = useCallback(() => {
        if (search.trim() === "")
            return [];
        console.log("filtering...");
        return Products.filter(x => x.includes(search.toLowerCase()));
    }, [search]);

    const handleClear = useCallback(() => {
        //console.log("set clear triggered-2");
        setSearch("");
    },[]);


    const filteredProducts = useMemo(() => filterProducts(), [filterProducts]);
    return (<div> search
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="button" onClick={() => setCount(prev => prev + 1)}> count:  {count}  </button>
        <ClearButton onClear={handleClear} />
        <ul>
            {filteredProducts.length > 0 && filteredProducts.map(x => <li key={x}>
                {x}
            </li>)}
        </ul>
    </div>);

};
export default MemoDrill;