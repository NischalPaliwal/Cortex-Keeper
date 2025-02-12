interface SidebarProps {
  onclick: () => void;
}

const Sidebar = ({ onclick }: SidebarProps) => {
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
    <div className="h-screen w-xs bg-white top-0 left-0 flex p-4 flex-col gap-4">
        {/* Close Option */}
        <div className="w-full p-2 flex justify-end">
        <div onClick={onclick} className="p-2 hover:bg-slate-400 rounded-lg border border-slate-700 bg-slate-700 hover:border-slate-400">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"/>
          </svg>
        </div>
        </div>
        {/* LOGO */}
        <div className="w-full p-2">
          <img src="https://img.freepik.com/free-vector/brain-human-anatomy-biology-organ-body-system-health-care-medical-hand-drawn-cartoon-art-illustration_56104-953.jpg?t=st=1739348475~exp=1739352075~hmac=023c14e8886eacfba01d6f3389951376a18b59a076de04b8278a3b4475ed84a0&w=826" className="object-contain w-full h-[70px]" />
        </div>
        {/* Options */}
        <div className="w-full p-2">
          {SideBarOptions.map((option) => (
            <div key={option.id} className="text-lg p-4 my-1 hover:bg-slate-100 hover:translate-x-1 rounded-lg">{option.title}</div>
          ))}
        </div>
      </div>
  )
}

export default Sidebar;