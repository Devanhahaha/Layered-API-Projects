type searchProps = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function Search({search, setSearch}: searchProps) {

    return (
        <div className="p-5">
            <input type="search" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full border rounded-md px-3 py-2"
            />
        </div>
    )
}