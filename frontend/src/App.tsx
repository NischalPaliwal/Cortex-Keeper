// import Button from "./components/Button"

function App() {
  const SideBarOptions = [
    {
      id: 1,
      title: "Tweets",
    },
    {
      id: 2,
      title: "Videos",
    },
    {
      id: 3,
      title: "Documents",
    },
    {
      id: 4,
      title: "Links",
    },
    {
      id: 5,
      title: "Tags",
    }
  ];

  return (
    <div className="min-h-screen w-full items-center justify-center bg-slate-200">
      {/* SideBar */}
      <div className="h-screen w-xs bg-white top-0 left-0 flex p-4 flex-col gap-4">
        {/* Close Option */}
        <div className="w-full p-2 flex justify-end">
          
        </div>
        {/* LOGO */}
        <div className="w-full p-2">
          <img src="https://img.freepik.com/free-vector/brain-human-anatomy-biology-organ-body-system-health-care-medical-hand-drawn-cartoon-art-illustration_56104-953.jpg?t=st=1739348475~exp=1739352075~hmac=023c14e8886eacfba01d6f3389951376a18b59a076de04b8278a3b4475ed84a0&w=826" className="object-contain w-full h-[120px]" />
        </div>
        {/* Options */}
        <div className="w-full p-2">
          {SideBarOptions.map((option) => (
            <div key={option.id} className="text-lg p-4 my-1 hover:bg-slate-100 hover:translate-x-1 rounded-lg">{option.title}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App

// <Button bg={'bg-purple-700'} txt={'text-white'} content={"Share Brain"} />
// <Button bg={'bg-purple-200'} txt={'text-purple-800'} content={"Add Content"} />