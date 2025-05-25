export default function Layout({ children }) {
    return(
        <div  style={{backgroundColor:'#091225'}
        } className=" text-black max-w-xl mx-auto border-l border-r min-h-screen border-gray-600">
           {children}
            </div>
    )
}