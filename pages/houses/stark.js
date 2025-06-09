


export default function Stark(){
    return(
        <div className=" mt-10">
            
            <div className="max-w-xl mx-auto bg-black text-white font-serif  p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-100">House Targaryen of King's Landing</h1>

      <img src={"targ-house.webp"}>
      </img>

      <div className="bg-black text-red-600 text-center py-1 font-semibold text-3xl mb-4 rounded">
        " Fire and Blood "
      </div>

      <div className="text-sm space-y-6">
        <div>
          <strong className="text-xl text-gray-300 ">Coat of arms</strong><br />
          <div className="text-red-700 text-lg mt-3">
          A red three-headed dragon, breathing red fire on black<br />
          <em>(Sable, a dragon thrice-headed gules flammant of the last)</em>
          </div>
        </div>

        <div>
          <strong className="text-xl text-gray-300">Seats</strong><br />
          <div className="text-lg mt-3">
          <span className="text-red-700">Dragonstone</span> (formerly)<br />
          <span className="text-red-700">Aegonfort</span> (formerly)<br />
          <span className="text-red-700">Red Keep</span> (formerly)<br />
          <span className="text-red-700">Summerhall</span> (summer castle, formerly)<br />
          <span className="text-red-700">Great Pyramid</span>
          </div>
        </div>

        <div>
          <strong className="text-xl text-gray-300">Heads</strong><br />
          <div className="text-lg mt-3">
          Queen <span className="text-red-700">Daenerys I</span><br />
          King <span className="text-red-700">Aegon VI</span> <span className="italic">(disputed)</span>
          </div>
        </div>

        <div>
          <strong className="text-xl text-gray-300">Regions</strong><br />
          <div className="text-lg mt-3">
          <span className="text-red-700">Valyria</span> (formerly)<br />
          <span className="text-red-700">Crownlands</span> (formerly)<br />
          <span className="text-red-700">Slaver's Bay</span>
          </div>
        </div>

        <div>
          <strong className="text-xl text-gray-300">Titles</strong><br />
          <div className="text-lg mt-3">
          <span className="text-red-700">Dragonlord</span> (pre-<span className="italic">Doom</span>)<br />
          <span className="text-red-700">Lord of Dragonstone</span> (pre-<span className="italic">Conquest</span>)<br />
          <span className="text-red-700">King of the Andals, the Rhoynar, and the First Men</span><br />
          <span className="text-red-700">Lord of the Seven Kingdoms</span><br />
          <span className="text-red-700">Prince of Dragonstone</span> <span className="italic">(heir apparent)</span><br />
          <span className="text-red-700">Prince of Summerhall</span><br />
          <span className="text-red-700">Queen of Meereen</span>
          </div>
        </div>
      </div>
    </div>

        </div>
    )
}