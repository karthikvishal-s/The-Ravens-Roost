export default function Lannister() {
    return (
      <div className="mt-10">
        <div className="max-w-xl mx-auto bg-black text-white font-serif p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-4 text-gray-100">House Lannister of Casterly Rock</h1>
  
          <img src={"lann-house.webp"} alt="House Lannister Emblem" className="w-full h-auto rounded-lg mb-4">
      </img>
  
          <div className="bg-black text-yellow-500 text-center py-1 font-semibold text-3xl mb-4 rounded">
            "Hear Me Roar!" <span className="text-sm italic">(official)</span><br />
            "A Lannister Always Pays His Debts" <span className="text-sm italic">(common saying)</span>
          </div>
  
          <div className="text-sm space-y-6">
            <div>
              <strong className="text-xl text-gray-300">Coat of arms</strong><br />
              <div className="text-yellow-600 text-lg mt-3">
                A golden lion rampant on a crimson field
              </div>
            </div>
  
            <div>
              <strong className="text-xl text-gray-300">Seats</strong><br />
              <div className="text-lg mt-3">
                <span className="text-yellow-600">Casterly Rock</span><br />
                <span className="text-yellow-600">King's Landing</span> (formerly)
              </div>
            </div>
  
            <div>
              <strong className="text-xl text-gray-300">Heads</strong><br />
              <div className="text-lg mt-3">
                King <span className="text-yellow-600">Tommen I</span><br />
                Lord <span className="text-yellow-600">Tyrion Lannister</span> <span className="italic">(by titles)</span>
              </div>
            </div>
  
            <div>
              <strong className="text-xl text-gray-300">Regions</strong><br />
              <div className="text-lg mt-3">
                <span className="text-yellow-600">Westerlands</span>
              </div>
            </div>
  
            <div>
              <strong className="text-xl text-gray-300">Titles</strong><br />
              <div className="text-lg mt-3">
                <span className="text-yellow-600">Lord of Casterly Rock</span><br />
                <span className="text-yellow-600">Shield of Lannisport</span><br />
                <span className="text-yellow-600">Warden of the West</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  