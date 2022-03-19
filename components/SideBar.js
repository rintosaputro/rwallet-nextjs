import { BsGrid, BsArrowUp } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiUser3Line } from 'react-icons/ri';
import Link from 'next/link';
import { MdOutlineLogout } from 'react-icons/md';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

const SideBar = () => {
  const route = useRouter();
  const [routes, setRoutes] = useState('/home');

  useEffect(() => {
    setRoutes(route.pathname)
  }, [route.pathname])

  const dataSide = [
    {icon: BsGrid, desc: 'Dashboard', to: '/home'},
    {icon: BsArrowUp, desc: 'Transfer', to: '/transfer'},
    {icon: AiOutlinePlus, desc: 'Top Up', to: '/top-up'},
    {icon: RiUser3Line, desc: 'Profile', to: '/profile'}
  ]

  return (
    <div className='card p-4 bg-light position-relative h-100'>
        {dataSide.map((data, index) => {
          return <Link href={data.to} key={data.desc} className=' d-flex flex-row align-items-center my-3'>
            {route.pathname === '/histories' ? 
              <a id={data.desc} className={`${index === 0 ? 'active-side text-primary': 'text-white'} side-side text-decoration-none my-4 ps-2 d-flex flex-row align-items-center`}>
                <data.icon className='fs-5 me-2'/>
                <span>{data.desc}</span>
              </a>  
            : <a id={data.desc} className={`${routes === data.to ? 'active-side text-primary': 'text-white'} side-side text-decoration-none my-4 ps-2 d-flex flex-row align-items-center`}>
              <data.icon className='fs-5 me-2'/>
              <span>{data.desc}</span>
            </a>}
          </Link>
        })}
        <Link href='/login' className=' d-flex flex-row align-items-center my-3'>
          <a className='text-decoration-none text-white my-4 ps-3 position-absolute bottom-0'>
            <MdOutlineLogout className='fs-5 me-2'/>
            <span>Logout</span>
          </a>
        </Link>
      </div>
    //   <aside className='col-lg-4'>
    //   <div className='card p-4 bg-light position-relative'>
    //     {dataSide.map((data, index) => {
    //       return <Link href={data.to} key={data.desc} className=' d-flex flex-row align-items-center my-3'>
    //         <a className={`${routes === data.to && 'active-side'} side-side text-decoration-none text-white my-4 ps-2`}>
    //           <data.icon className='fs-5 me-2'/>
    //           <span>{data.desc}</span>
    //         </a>
    //       </Link>
    //     })}
    //     <Link href='/login' className=' d-flex flex-row align-items-center my-3 position-absolute'>
    //       <a className='text-decoration-none text-white my-4 ps-3'>
    //         <MdOutlineLogout className='fs-5 me-2'/>
    //         <span>Logout</span>
    //       </a>
    //     </Link>
    //   </div>
    // </aside>
  )
}

export default SideBar