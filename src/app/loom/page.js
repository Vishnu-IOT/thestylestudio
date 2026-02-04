"use client";

import { useEffect, useState } from "react";
import "../../styles/hero.css";
import {
    FaRegArrowAltCircleLeft,
    FaRegArrowAltCircleRight,
} from "react-icons/fa";
import Breadcrumb from "@/component/breadcrumb";

export default function LoomAdminPage() {
    const [sarees, setSarees] = useState([]);

    const fetchSarees = async () => {
        const res = await fetch("/api/loom");
        setSarees(await res.json());
    };

    useEffect(() => {
        fetchSarees();
    }, []);

    // add / remove loom
    const toggleLoom = async (id, value) => {
        await fetch("/api/loom", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id,
                loom: value,
            }),
        });

        fetchSarees();
    };

    const finalPrice = (discount, price) => {
        return Math.round(price * ((100 - discount) / 100));
    };

    return (
        <div className="admin-container">
            <div className="title-main">
                <div className='title-container'>
                    <h1 className="admin-title">Hot of the Loom</h1>
                    <Breadcrumb />
                </div>
            </div>
            <h1 className="admin-title2">🔥 Trending in Loom</h1>
            <p className="admin-desc">Most popular sarees from the loom collection.</p>
            <div className="saree-list">
                {sarees.filter((s) => s.loom).map((s) => (
                    <div className="saree-card" key={s._id}>
                        <img src={s.image} alt={s.name} />

                        <h3>{s.name}</h3>

                        <div className="price-span">
                            <p>₹{finalPrice(s.discount, s.price)}</p>
                            <span className="strike">₹{s.price}</span>
                            <span>{s.discount}% OFF</span>
                        </div>

                        <div className="actions">
                            <button
                                className="delete-btn"
                                onClick={() => toggleLoom(s._id, false)}
                            >
                                Remove from Loom
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <h1 className="admin-title2">🧺 Classic Sarees</h1>
            <p className="admin-desc">Everyday sarees beyond the highlighted loom picks.</p>
            <div className="saree-list">
                {sarees.filter((s) => !s.loom).map((s) => (
                    <div className="saree-card" key={s._id}>
                        <img src={s.image} alt={s.name} />

                        <h3>{s.name}</h3>

                        <div className="price-span">
                            <p>₹{finalPrice(s.discount, s.price)}</p>
                            <span className="strike">₹{s.price}</span>
                            <span>{s.discount}% OFF</span>
                        </div>
                        <div className="actions">
                            <button
                                className="loom-add-btn"
                                onClick={() => toggleLoom(s._id, true)}
                            >
                                Add to Loom
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
