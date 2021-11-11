import React from 'react';

import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { FaAppleAlt, FaCarrot, FaSeedling, FaFish, FaHeart } from 'react-icons/fa';
import {GiMilkCarton, GiSheep} from 'react-icons/gi';


const SideBar = ({collapsed, width}) => {
   

    return (
    
        <ProSidebar 
        collapsed={collapsed}
        width={width}>
            <SidebarHeader>
                <div
                    style={{
                        padding: '24px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 14,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                    >
                    Our Categories
                </div>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem icon={<GiMilkCarton />}>Dairies</MenuItem>
                    <MenuItem icon={<FaAppleAlt />}>Fruits</MenuItem>
                    <MenuItem icon={<FaCarrot />}>Vegetables</MenuItem>
                    <MenuItem icon={<GiSheep />}>Meat</MenuItem>
                    <MenuItem icon={<FaSeedling/>}>Plants</MenuItem>
                    <MenuItem icon={<FaFish/>}>Fish</MenuItem>
                    <SubMenu title="Farmers" icon={<FaHeart />}>
                    <MenuItem>Farmer 1</MenuItem>
                    <MenuItem>Farmer 2</MenuItem>
                    <MenuItem>Farmer 3</MenuItem>
                    <MenuItem>Farmer 4</MenuItem>
                    <MenuItem>Farmer 5</MenuItem>
                    </SubMenu>
                </Menu>
            </SidebarContent>
            <SidebarFooter style={{ textAlign: 'center' }}>
                <div
                className="sidebar-btn-wrapper"
                style={{
                    padding: '20px 24px',
                }}
                >
                <a
                    href="/"
                    className="sidebar-btn"
                    rel="noopener noreferrer"
                >
                    <FaHeart />
                    <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    Go Home
                    </span>
                </a>
                </div>
            </SidebarFooter>
        </ProSidebar>

        );
  };
  export default SideBar;