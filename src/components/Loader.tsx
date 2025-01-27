
export default function Loader() {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-2xl">
      </div>
      <div className="fixed inset-0 flex items-center justify-center z-[9999]">
        <img
          src="../../public/loadingVideo.gif"
          width={"800px"}
          height={"800px"}
          alt="loader"
        />
      </div>
    </>
  )
}
