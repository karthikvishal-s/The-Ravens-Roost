export default function Layout({ children }) {
    return(
        <div  style={{backgroundColor:'#000000'}
        } className=" text-black w-[1000px] mx-auto  min-h-screen border-gray-600">
           {children}
            </div>
    )
}