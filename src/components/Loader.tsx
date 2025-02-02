export default function Loader() {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-2xl">
      </div>
      <div className="fixed inset-0 flex items-center justify-center z-[9999]">
        <video autoPlay loop muted playsInline className="size-[800px]">
          <source src={"../../public/dark-heart-loader.webm"} type="video/webm" />
        </video>
      </div>
    </>
  )
}
