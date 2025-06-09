export default function Baratheon() {
    return (
      <div className="mt-10">
        <div className="max-w-xl mx-auto bg-black text-white font-serif p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-4 text-gray-100">House Baratheon of Storm's End</h1>
  
          <img src={"bara-house.webp"} />
  
          <div className="bg-black text-yellow-500 text-center py-1 font-semibold text-3xl mb-4 rounded">
            "Ours is the Fury"
          </div>
  
          <div className="text-sm space-y-6">
            <div>
              <strong className="text-xl text-gray-300">Coat of arms</strong><br />
              <div className="text-yellow-600 text-lg mt-3">
                A crowned black stag on a gold field
              </div>
            </div>
  
            <div>
              <strong className="text-xl text-gray-300">Seats</strong><br />
              <div className="text-lg mt-3">
                <span className="text-yellow-600">Storm's End</span><br />
                <span className="text-yellow-600">Dragonstone</span> (formerly)<br />
                <span className="text-yellow-600">King's Landing</span> (formerly)
              </div>
            </div>
  
            <div>
              <strong className="text-xl text-gray-300">Heads</strong><br />
              <div className="text-lg mt-3">
                King <span className="text-yellow-600">Robert I</span><br />
                Lord <span className="text-yellow-600">Gendry Baratheon</span> <span className="italic">(acknowledged)</span>
              </div>
            </div>
  
            <div>
              <strong className="text-xl text-gray-300">Regions</strong><br />
              <div className="text-lg mt-3">
                <span className="text-yellow-600">Stormlands</span>
              </div>
            </div>
  
            <div>
              <strong className="text-xl text-gray-300">Titles</strong><br />
              <div className="text-lg mt-3">
                <span className="text-yellow-600">Lord of Storm's End</span><br />
                <span className="text-yellow-600">King of the Andals and the First Men</span><br />
                <span className="text-yellow-600">Protector of the Realm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  