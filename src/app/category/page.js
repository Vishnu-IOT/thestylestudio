'use client'

import React, { useEffect, useState } from 'react'
import '../../styles/hero.css';
import Breadcrumb from '@/component/breadcrumb';
import { useRouter } from 'next/navigation';

function Page() {
    const router = useRouter();
    const [form, setForm] = useState({
        category: ""
    });
    const [category, setCategory] = useState([]);

    const fetchCategory = async () => {
        const res = await fetch("/api/category");
        setCategory(await res.json());
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    // Check user if Logged In or Not
    useEffect(() => {
        const isAuth = document.cookie.includes("auth=true");
        if (!isAuth) {
            router.replace("/");
        }
    }, []);

    const addCategory = async () => {
        await fetch("/api/category", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        setForm({ category: "" });
        fetchCategory();
    };

    const deleteCategory = async (id) => {
        await fetch("/api/category", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        fetchCategory();
    };

    return (
        <div className="admin-container">
            <div className="title-main">
                <div className='title-container'>
                    <h1 className="admin-title">Add New Category</h1>
                    <Breadcrumb />
                </div>
            </div>
            <h1 className="admin-title2">🏷️ Category Management</h1>
            <p className="admin-desc">Create and manage categories to organize your saree collections.</p>
            <div className="form">

                <input placeholder="Category" value={form.category} required
                    onChange={e => setForm({ ...form, category: e.target.value })} />

                <button className="add-btn" onClick={addCategory}>Add Category</button>
            </div>

            <h1 className="admin-title">🛍️ Categories</h1>
            <div className="category-list">
                {category.map(s => (
                    <div className="category-card" key={s._id}>
                        <h3>{s.category}</h3>
                        <span><button className="delete-btn" onClick={() => deleteCategory(s._id)}>🗑</button></span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page
