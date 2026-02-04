'use client'

import React, { useEffect, useState } from 'react'
import '../../styles/hero.css';
import Breadcrumb from '@/component/breadcrumb';

function Page() {
    const [sarees, setSarees] = useState([]);

    const fetchSarees = async () => {
        const res = await fetch("/api/loom");
        setSarees(await res.json());
    };

    useEffect(() => {
        fetchSarees();
    }, []);

    // active / inactive Sarees
    const toggleLoom = async (id, value) => {
        const newStatus = value === "active" ? "inactive" : "active";
        await fetch("/api/loom", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id,
                status: newStatus,
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
                    <h1 className="admin-title">Active/Inactive Sarees</h1>
                    <Breadcrumb />
                </div>
            </div>
            <h1 className="admin-title2">🔄 Saree Availability</h1>
            <p className="admin-desc">Toggle sarees between active and inactive states.</p>
            <div className="saree-list">
                {sarees.map((s) => (
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
                                className={`loom-toggle-btn ${s.status}`}
                                onClick={() => toggleLoom(s._id, s.status)}
                            >
                                {s.status === "active" ? "Deactivate" : "Activate"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page
