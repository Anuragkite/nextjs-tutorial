
 export default async function UserProfile({params}:{params:Promise<{id:string}>  }) {

    const {id}= await params;
    return (
        <div className="flex items-center justify-center min-h-screen py-2">
            <h1>Profile </h1>
            <hr />
            <p >
                Profile user ==<span className="p-2 bg-violet-500 text-white mx-3 rounded-lg" >{id}</span>  
            </p>


        </div>
    )
}