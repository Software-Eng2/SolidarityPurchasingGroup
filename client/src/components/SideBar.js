import React , {useState} from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { FaAppleAlt, FaCarrot, FaSeedling, FaFish, FaHeart,FaShoppingCart } from 'react-icons/fa';
import {GiMilkCarton, GiSheep} from 'react-icons/gi';
import Basket from './Basket';


const SideBar = ({collapsed, width, basket, handleBasket}) => {

    return (
        <>

            <ProSidebar 
            collapsed={collapsed}
            width={width}>
                <SidebarHeader>
                    <Menu iconShape="circle">
                        <MenuItem icon={<FaShoppingCart/>} onClick={handleBasket}>
                            <div
                            style={{
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: 12,
                                letterSpacing: '1px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                            >
                            Your Basket
                            </div>
                          
                        </MenuItem> 
                    </Menu>
                </SidebarHeader>
                <SidebarContent>
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
                        href="/clientlist"
                        className="sidebar-btn"
                        rel="noopener noreferrer"
                    >
                    
                        <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        Go back to clients
                        </span>
                    </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>

        );
  };
  export default SideBar;