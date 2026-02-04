"use client";

import Link from "next/link";
import "../styles/sidebar.css";
import {
    HiMenu,
    HiX,
    HiHome,
    HiPlus,
    HiShoppingCart,
    HiUserGroup,
    HiGlobeAlt,
    HiChevronDown,
    HiChevronRight,
    HiTag,
    HiCube,
} from "react-icons/hi";
import { VscLayersActive } from "react-icons/vsc";
import { useState } from "react";

export default function Sidebar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [sareeOpen, setSareeOpen] = useState(false);

    return (
        <>
            <button
                className="hamburger-mobile"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <HiX /> : <HiMenu />}
            </button>

            <aside className={`sidebar ${menuOpen ? "open" : "collapsed"}`}>
                {/* Hamburger */}
                <button
                    className="hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <HiX /> : <HiMenu />}
                </button>

                {menuOpen && <h2 className="sidebar-title">Admin Panel</h2>}

                <nav className="sidebar-nav">
                    <Link href="/home" className="nav-item" >
                        <HiHome className="icon" />
                        {menuOpen && <span onClick={() => setMenuOpen(!menuOpen)}>Dashboard</span>}
                    </Link>

                    {/* Add Sarees (Parent) */}
                    <div
                        className="nav-item submenu-parent"
                        onClick={() => setSareeOpen(!sareeOpen)}
                    >
                        <div className="submenu-title" onClick={() => setMenuOpen(true)}>
                            <HiPlus className="icon" />
                            {menuOpen && <span>Sarees</span>}
                        </div>
                        {menuOpen && (
                            sareeOpen ? <HiChevronDown /> : <HiChevronRight />
                        )}
                    </div>

                    {/* Submenu */}
                    {menuOpen && sareeOpen && (
                        <div className="submenu">
                            <Link href="/form" className="submenu-item">
                                <HiTag className="icon" />
                                <span onClick={() => setMenuOpen(!menuOpen)}>Add Sarees</span>
                            </Link>
                            <Link href="/category" className="submenu-item" >
                                <HiCube className="icon" />
                                <span onClick={() => setMenuOpen(!menuOpen)}>Add Category</span>
                            </Link>
                            <Link href="/active" className="submenu-item" >
                                <VscLayersActive className="icon" />
                                <span onClick={() => setMenuOpen(!menuOpen)}>Active/Inactive</span>
                            </Link>
                        </div>
                    )}

                    <Link href="/loom" className="nav-item">
                        <HiShoppingCart className="icon" />
                        {menuOpen && <span onClick={() => setMenuOpen(!menuOpen)}>Add Loom</span>}
                    </Link>

                    {/* <Link href="/" className="nav-item">
                    <HiUserGroup className="icon" />
                    {menuOpen && <span onClick={() => setMenuOpen(!menuOpen)}>Users</span>}
                </Link>

                <Link href="/" className="nav-item">
                    <HiGlobeAlt className="icon" />
                    {menuOpen && <span onClick={() => setMenuOpen(!menuOpen)}>Go to Website</span>}
                </Link> */}
                </nav>
            </aside>
        </>
    );
}
