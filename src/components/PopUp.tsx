import { toast } from "sonner"

const Popup = ({ closePopUp }: { closePopUp: any }) => {

    const hanldeCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);

        toast.success("Link copied to clipboard", {
            description: "Share with your friends to collaborate!",
        })

    }

    return (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="p-5 rounded-md bg-[#14181F] border-gray-500 border-[1px] text-gray-200 min-w-[20vw]">
                <h2 className="text-lg font-bold text-center">Welcome to AquaCoder 💧</h2>
                <img src="/favicon.png" alt="banner" className="w-[400px] mx-auto h-auto my-4" />


                <div className="flex items-center gap-2 mt-5">
                    <span className="text-md text-gray-200 font-sans font-medium"> Share the link to code together in real time! </span>
                </div>

                <button 
                    onClick={hanldeCopyLink}
                    className="mt-4 px-4 py-2 border-gray-500 border-[1px] text-white rounded w-full hover:bg-white hover:text-black font-sans font-semibold transition-all duration-150">
                    Copy link
                </button>
                <button 
                    onClick={closePopUp} 
                    className="mt-3 px-4 py-2 border-gray-500 border-[1px] text-white rounded w-full hover:bg-white hover:text-black font-sans font-semibold transition-all duration-150">
                    Close
                </button>
            </div>
        </div>
    );
};

export default Popup;