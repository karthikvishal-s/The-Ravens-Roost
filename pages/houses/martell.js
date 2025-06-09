export default function Martell() {
    return (
      <div className="mt-10">
        <div className="max-w-xl mx-auto bg-black text-white font-serif p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-4 text-gray-100">House Martell of Sunspear</h1>
  
          <img src={""} />
  
          <div className="bg-black text-orange-500 text-center py-1 font-semibold text-3xl mb-4 rounded">
            "Unbowed, Unbent, Unbroken"
          </div>
  
          <div className="text-sm space-y-6">
            <div>
              <strong className="text-xl text-gray-300">Coat of arms</strong><br />
              <div className="text-orange-400 text-lg mt-3">
                A red sun pierced by a golden spear on an orange field
              </div>
            </div>
  
            <div>
              <strong className="text-xl text-gray-300">Seats</strong><br />
              <div className="text-lg mt-3">
                <span className="text-orange-400">Sunspear</span>
              </div>
            </div>
  
            <div>
              <strong className="text-xl text-gray-300">Heads</strong><br />
              <div className="text-lg mt-3">
                Prince <span className="text-orange-400">Doran Martell</span><br />
                Prince <span className="text-orange-400">Trystane Martell</span>
              </div>
            </div>
  
            <div>
              <strong className="text-xl text-gray-300">Regions</strong><br />
              <div className="text-lg mt-3">
                <span className="text-orange-400">Dorne</span>
              </div>
            </div>
  
            <div>
              <strong className="text-xl text-gray-300">Titles</strong><br />
              <div className="text-lg mt-3">
                <span className="text-orange-400">Prince of Dorne</span><br />
                <span className="text-orange-400">Lord of Sunspear</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  