import { useEffect, useState } from "react";
import CustomCard from "../../components/CustomCard";
import CreateCategory from "../../components/CreateCategory";

interface Category {
    id: string;
    imageUrl: [string];
    name: string;
}

export default function AdminCategory(): JSX.Element {

    const token = localStorage.getItem('adminToken');
    if (!token) {
        window.location.href = '/';
    }

    const [data, setData] = useState<Category[] | undefined>();
    const [modalVisible, setModalVisible] = useState(false);
    const [filteredCategory, setFilteredCategory] = useState<Category[]>([]);
    const [query, setQuery] = useState('');

    function refresh() {
        console.log('Refreshing');
        if (token) {
            fetch('http://localhost:8080/api/category', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + token
                },
            })
                .then(res => res.json())
                .then((data: Category[]) => { console.log(data); setData(data) })
        }
    }

    useEffect(() => {
        if (data) {
            const filtered = data.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredCategory(filtered);
        }
    }, [data, query]);

    useEffect(() => {
        refresh();
    }, [token])

    return (
        <>

            <div className="w-4/5 mx-auto min-h-screen mb-20">
                <div>&nbsp;</div>
                <div className="flex justify-between items-center mt-10">
                    <div className="font-semibold text-3xl text-center">Product Categories</div>
                    <div className="flex w-1/2 justify-between">
                        <input type="text" placeholder="Search" className="w-full px-4 max-w-[450px] border-2 rounded-lg"
                            value={query} onChange={(e) => setQuery(e.target.value)}
                        />
                        <button
                            onClick={() => { setModalVisible(true) }}
                            className="flex justify-center items-center px-5 py-3 mx-2 card2">
                            Add Category
                        </button>
                    </div>

                </div>
                <div className="flex justify-center flex-wrap mt-16 mb-20">

                    {
                        data && filteredCategory && filteredCategory.length > 0 && filteredCategory.map((item: Category, index: number) => {
                            return (
                                <CustomCard key={index} refresh={refresh} name={item.name} link={item.id} imageUrl={item.imageUrl[0]} varient="category" />
                            )
                        })
                    }

                    <CreateCategory refresh={refresh} visible={modalVisible} setVisible={setModalVisible} />
                </div>
            </div>
        </>
    );
}
