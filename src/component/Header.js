"use client";

import React, { useState } from "react";
// import { useCart } from "../context/CartContext";
// import { useSearch } from "../context/SearchContext";
import "../styles/Header.css";
import { CgProfile } from "react-icons/cg";
// import { HiMenu, HiX } from "react-icons/hi";
import Image from "next/image";
import wed from "../assets/hand-drawn-sari-illustration.png"
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/Auth/firebase";
import { useRouter } from "next/navigation";

const Header = () => {
  // const { getCartCount, toggleCart } = useCart();
  // const { searchTerm, setSearchTerm } = useSearch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    router.replace("/");
  };

  return (
    <header className="header">
      <div className="header-container">

        {/* Logo */}
        <div className="logo">
          <Image src={wed} alt="Wedding Sarees" width={50} height={50} className="emoji" />
          <Link href="/home"><span className="logo-text">The Style Studio</span></Link>
        </div>

        <div className="sub-header">
          {/* Desktop Nav */}
          <nav className="nav">
            <Link href="/home" className="nav-link">New Arrivals</Link>
            {/* <Link href="/product" className="nav-link">Sarees</Link>
            <Link href="/contact" className="nav-link">Customer Support</Link> */}

            <select className="lang-select">
              <option>En</option>
              <option>Ta</option>
            </select>
          </nav>

          {/* Profile */}
          <div className="profile pro">
            <button
              className="cart-button pro"
              onClick={() => setOpen(!open)}
            >
              <CgProfile />
            </button>

            {open && (
              <div className="profile-dropdown">
                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Cart */}
          {/* <button className="cart-button pro" onClick={toggleCart}>
            <span className="cart-icon">🛒</span>
            {getCartCount() > 0 && (
              <span className="cart-badge">{getCartCount()}</span>
            )}
          </button> */}

          {/* Hamburger */}
          {/* <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button> */}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link href="/" onClick={() => setMenuOpen(false)}>New Arrivals</Link>
        <Link href="/product" onClick={() => setMenuOpen(false)}>Sarees</Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>Customer Support</Link>

        <select className="mobile-lang">
          <option>English</option>
          <option>Tamil</option>
        </select>

        {/* Cart */}
        {/* <button className="cart-button" onClick={toggleCart}>
          <span className="cart-icon">🛒</span>
          {getCartCount() > 0 && (
            <span className="cart-badge">{getCartCount()}</span>
          )}
        </button> */}
      </div>
    </header >
  );
};

export default Header;
