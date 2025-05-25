export default function PostButtons() {
    return (
        <div className="flex justify-between items-center p-2 border-t border-gray-600 pt-6">
            <button className="text-xl text-gray-400 flex ml-3">
                <img src={'/swords.png'} className="w-7"></img>
                <span className="ml-3">0</span>
            </button>

            <button className="text-xl text-gray-400 flex">
                <img src={'/circular-arrows.png'} className="w-7"></img>
                <span className="ml-3">0</span>
            </button>

            <button className="text-xl text-gray-400 flex">
                <img src={'/crow.png'} className="w-7"></img>
                <span className="ml-3">0</span>
            </button>

            <button className="text-xl text-gray-400 flex mr-3">
                <   img src={'/manuscript.png'} className="w-7"></img>
            </button>

        </div>
    )
}