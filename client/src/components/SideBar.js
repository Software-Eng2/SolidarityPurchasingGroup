import React from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { FaAppleAlt, FaCarrot, FaSeedling, FaFish, FaProductHunt ,FaShoppingCart } from 'react-icons/fa';
import {GiMilkCarton, GiSheep} from 'react-icons/gi';


const SideBar = ({collapsed, width, searchCategory, handleBasket}) => {
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
                        <MenuItem value="All" onClick={() => { searchCategory("All") }} icon={<FaProductHunt />}>All products</MenuItem>
                        <MenuItem value="Dairies" onClick={() => { searchCategory("Dairies") }} icon={<GiMilkCarton />}>Dairies</MenuItem>
                        <MenuItem value="Fruits" onClick={() => { searchCategory("Fruits") }} icon={<FaAppleAlt />}>Fruits</MenuItem>
                        <MenuItem value="Vegetables" onClick={() => { searchCategory("Vegetables") }} icon={<FaCarrot />}>Vegetables</MenuItem>
                        <MenuItem value="Meat" onClick={() => { searchCategory("Meat") }} icon={<GiSheep />}>Meat</MenuItem>
                        <MenuItem value="Plants" onClick={() => { searchCategory("Plants") }} icon={<FaSeedling/>}>Plants</MenuItem>
                        <MenuItem value="Fish" onClick={() => { searchCategory("Fish") }} icon={<FaFish/>}>Fish</MenuItem>
                        {/* <SubMenu title="Farmers" icon={<FaHeart />}>
                        <MenuItem>Farmer 1</MenuItem>
                        <MenuItem>Farmer 2</MenuItem>
                        <MenuItem>Farmer 3</MenuItem>
                        <MenuItem>Farmer 4</MenuItem>
                        <MenuItem>Farmer 5</MenuItem>
                        </SubMenu> */}
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