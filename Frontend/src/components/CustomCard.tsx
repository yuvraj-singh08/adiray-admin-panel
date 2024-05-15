
interface Props {
    name: string;
    imageUrl: string;
    link: string;
    varient: 'product' | 'category'
}

export default function CustomCard({ name, imageUrl, link, varient }: Props) {
    console.log('imageUrl', imageUrl);
    return (
        <>
            {varient === 'category' &&
                <a href={`/admin/category/${link}`}>
                    <div className="my-8 mx-4 rounded overflow-hidden bg-white rounded-xl shadow-md w-60" >
                        <div className="h-60 flex justify-center items-center overflow-hidden">
                            <img className="w-full" src={imageUrl} alt="Product Image" />
                        </div>
                        <div className="text-center my-4">
                            <div className="">{name}</div>
                        </div>
                    </div>
                </a>
            }

            {varient === 'product' &&
                <a href={`${link}`}>
                    <div className="my-8 mx-4 rounded overflow-hidden bg-white rounded-xl shadow-md w-60" >
                        <div className="h-60 flex justify-center items-center overflow-hidden">
                            <img className="w-full" src={imageUrl} alt="Product Image" />
                        </div>
                        <div className="text-center my-4">
                            <div className="">{name}</div>
                        </div>
                    </div>
                </a>
            }
        </>
    );
}


// interface CustomCardProps {
//     data: {
//         name: string;
//         imageUrl: string;
//     }
// }

// export default function CustomCard({ data }: CustomCardProps) {
//     const cardStyle = {
//         maxWidth: '450px',
//     }
//     return (
//         <>
//             {/* <div className="flex justify-center items-center px-5 py-3 bg-blue-500 mx-2 my-3 card">
//                 {data.name}
//             </div> */}
//             <div className=" mx-2 p-3 max-w-md">
//                 <div className=" bg-black overflow-hidden">
//                     <img src={data.imageUrl} alt={data.name} className="w-full" />
//                 </div>
//             </div>
//         </>
//     )
// }
