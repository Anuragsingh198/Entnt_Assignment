import  React , {useState} from'react'
import {SidebarItem} from './SideBarItem'

export const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('');

  return (
    <div className="w-64 bg-gray-800 text-white p-5 shadow-lg">
      <h2 className="text-xl font-semibold mb-8 pb-2 border-b border-gray-700">Navigation</h2>
      
      <nav>
        <ul className="space-y-4">
          <SidebarItem 
            title="Ships" 
            active={activeItem === 'ships'} 
            onClick={() => setActiveItem('ships')} 
          />
          <SidebarItem 
            title="Jobs" 
            active={activeItem === 'jobs'} 
            onClick={() => setActiveItem('jobs')} 
          />
          <SidebarItem 
            title="Components" 
            active={activeItem === 'components'} 
            onClick={() => setActiveItem('components')} 
          />
          <SidebarItem 
            title="Calendar" 
            active={activeItem === 'calendar'} 
            onClick={() => setActiveItem('calendar')} 
          />
          <SidebarItem 
            title="Login" 
            active={activeItem === 'login'} 
            onClick={() => setActiveItem('login')} 
          />
        </ul>
      </nav>
    </div>
  );
};