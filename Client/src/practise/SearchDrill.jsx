import { useEffect, useState } from "react";




const SearchDrill = () => {

    const [data, setData] = useState("");
    const [debounceData, setDebounceData] = useState("");
    const [products, setProducts] = useState([]);

    const getData = async (item) => {
        try {
            const result = await fetch(`https://dummyjson.com/products/search?q=${item}`);
            if (result.ok) {

                const jsonConvUpdatedData = await result.json();
                setProducts(jsonConvUpdatedData.products);
            }

        }
        catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {
        if (debounceData.trim() === "") {
            setProducts([])
            return;

        }
        getData(debounceData);
        //console.log(debounceData);
    }, [debounceData]);


    useEffect(() => {
        const timerId = setTimeout(() => {
            // console.log(data);
            setDebounceData(data);
        }, 500);
        return () => clearTimeout(timerId);
    }, [data])

    return (
        <div>
            <input type="text" value={data} onChange={(e) => setData(e.target.value)} />
            <p> you typed: {data}</p>
            <p> searching for: {debounceData} </p>
            <div>
                {products.length >0  ? "Results" : ""}
                <ul>

                    {products.map(x =>
                        <li key={x.id}>
                            {x.title}--{x.price}
                        </li>)}
                </ul>
            </div>
        </div>
    );
};
export default SearchDrill;