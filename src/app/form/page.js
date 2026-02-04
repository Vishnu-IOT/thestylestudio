'use client'

import React, { useEffect, useState } from 'react'
import '../../styles/hero.css';
import Breadcrumb from '@/component/breadcrumb';

function Page() {
    const [imageFile, setImageFile] = useState(null);
    const [form, setForm] = useState({
        name: "",
        desc: "",
        discount: "",
        price: "",
        category: ""
    });
    const [category, setCategory] = useState([]);

    const addSaree = async () => {
        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("desc", form.desc);
        formData.append("discount", form.discount);
        formData.append("price", form.price);
        formData.append("category", form.category);
        formData.append("image", imageFile);

        await fetch("/api/saree", {
            method: "POST",
            body: formData,
        });

        setForm({ name: "", desc: "", discount: "", price: "", category: "" });
        setImageFile(null);
    };

    const fetchCategory = async () => {
        const res = await fetch("/api/category");
        setCategory(await res.json());
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    return (
        <div className="admin-container">
            <div className="title-main">
                <div className='title-container'>
                    <h1 className="admin-title">Add New Collections</h1>
                    <Breadcrumb />
                </div>
            </div>
            <h1 className="admin-title2">➕ Add New Collections</h1>
            <p className="admin-desc">Create and add new sarees to your collection with complete details.</p>
            <div className="form">
                <input placeholder="Name" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} />

                <input placeholder="Description" value={form.desc}
                    onChange={e => setForm({ ...form, desc: e.target.value })} />

                <input placeholder="Discount" value={form.discount}
                    onChange={e => setForm({ ...form, discount: e.target.value })} />

                <input placeholder="Price" value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })} />

                {/* <input placeholder="Category" value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })} /> */}

                <select placeholder="Category" value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}>
                    {/* <option>Category</option>
                    <option>Silk Cotton</option>
                    <option>Tissue Saree</option>
                    <option>Lycra</option>
                    <option>Polyster</option>
                    <option>Net Saree</option>
                    <option>Liva Saree</option> */}
                    <option>Select your Category</option>
                    {category.map(s => (
                        <option key={s._id}>{s.category}</option>
                    ))}
                </select>

                <input type='file' placeholder="Image URL" accept="image/*" value={form.image}
                    onChange={(e) => setImageFile(e.target.files[0])} />

                <button className="add-btn" onClick={addSaree}>Add Saree</button>
            </div>

        </div>
    )
}

export default Page
