export default function Spinner(){
    return(
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-26 h-26 border-2 border-yellow-500 border-t-transparent rounded-full"
            style={{ animation: "tilt-spin 0.6s infinite ease-in-out" }}
          />
          <style jsx>{`
            @keyframes tilt-spin {
              0%, 100% { transform: rotate(-10deg); }
              50% { transform: rotate(10deg); }
            }
          `}</style>
        </div>
    )
}