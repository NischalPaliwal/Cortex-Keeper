import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faFile, faLink, faTag } from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
    onclick: () => void;
  }

const ContractedSidebar = ({ onclick }: SidebarProps) => {
    const SideBarOptions = [
        {
          id: 1,
          icon: faTwitter,
        },
        {
          id: 2,
          icon: faYoutube,
        },
        {
          id: 3,
          icon: faFile,
        },
        {
          id: 4,
          icon: faLink,
        },
        {
          id: 5,
          icon: faTag,
        }
      ];

  return (
    <div className="h-screen w-[80px] bg-white top-0 left-0 flex p-4 flex-col gap-10 items-center transition-width duration-300">
        <div onClick={onclick} className="p-2 hover:bg-slate-400 rounded-lg border border-slate-700 bg-slate-700 hover:border-slate-400 mt-2">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
            </svg>
        </div>
        <div className="flex flex-col gap-14 items-center mt-5">
        { SideBarOptions.map((option) => (
            <div className='hover:translate-x-1 px-2 hover:border-l-2 hover:border-r-slate-700' key={option.id} >
                <FontAwesomeIcon icon={option.icon} size={"2x"} color={"rgb(51 65 85)"} />
            </div>
        )) }
        </div>
    </div>
  )
}

export default ContractedSidebar;