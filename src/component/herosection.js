import Image from "next/image";
import { useEffect, useState } from "react";
import '../styles/hero.css';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import Breadcrumb from "./breadcrumb";
import loaderAnimation from '../lottie/loader.json';
import Lottie from "react-lottie";

export default function AdminPage() {
    const [sarees, setSarees] = useState([]);
     const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editForm, setEditForm] = useState({
        id: "",
        name: "",
        desc: "",
        discount: "",
        price: "",
        category: "",
        image: ""
    });

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const fetchSarees = async (pageNumber = 1) => {
        setLoading(true);
        const res = await fetch(`/api/saree?page=${pageNumber}&limit=8`);
        const data = await res.json();

        setSarees(data.sarees);
        setTotalPages(data.totalPages);
        setPage(data.currentPage);
        setLoading(false);
    };


    useEffect(() => {
        fetchSarees(page);
    }, [page]);


    const deleteSaree = async (id) => {
        await fetch("/api/saree", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        fetchSarees();
    };

    const updateSaree = async () => {
        await fetch("/api/saree", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editForm),
        });

        setIsModalOpen(false);
        fetchSarees();
    };

    const disper = (dis, price) => {
        const remain = 100 - dis;
        return Math.round(price * (remain / 100));
    }
    
    const loaderOptions = {
        loop: true,
        autoplay: true,
        animationData: loaderAnimation,
        rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        },
    };
    
    return (
        <div className="admin-container">
            <div className="title-main">
                <div className='title-container'>
                    <h1 className="admin-title">Saree Management</h1>
                    <Breadcrumb />
                </div>
            </div>
            <h1 className="admin-title2">✏️ Edit Saree Details</h1>
            <p className="admin-desc">Make quick changes to saree details and manage your catalog efficiently.</p>

        {loading ? (
                <div className="loader-container">
                    <Lottie
                        options={loaderOptions}
                        height={200}
                        width={200}
                    />
                    <p>Loading sarees...</p>
                </div>
            ) : (
            <div className="saree-list">
                {sarees.map(s => (
                    <div className="saree-card" key={s._id}>
                        <img src={s.image} alt={s.name} />
                        <h3>{s.name}</h3>

                        <div className="price-span">
                            <p>₹{disper(s.discount, s.price)}</p>
                            <span className="strike">₹{s.price}</span>
                            <span>{s.discount}% OFF</span>
                        </div>

                        <div className="actions">
                            <button
                                className="update-btn"
                                onClick={() => {
                                    setEditForm({
                                        id: s._id,
                                        name: s.name,
                                        desc: s.desc,
                                        discount: s.discount,
                                        price: s.price,
                                        category: s.category,
                                        image: s.image
                                    });
                                    setIsModalOpen(true);
                                }}
                            >
                                Edit
                            </button>

                            <button className="delete-btn" onClick={() => deleteSaree(s._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
         )}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Update Saree</h2>

                        <input
                            placeholder="Name"
                            value={editForm.name}
                            onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                        />
                        <input
                            placeholder="Description"
                            value={editForm.desc}
                            onChange={e => setEditForm({ ...editForm, desc: e.target.value })} />

                        <input
                            placeholder="Discount"
                            value={editForm.discount}
                            onChange={e => setEditForm({ ...editForm, discount: e.target.value })} />

                        <input
                            placeholder="Price"
                            value={editForm.price}
                            onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                        />

                        <input
                            placeholder="Category"
                            value={editForm.category}
                            onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                        />

                        <input
                            placeholder="Image URL"
                            value={editForm.image}
                            onChange={e => setEditForm({ ...editForm, image: e.target.value })}
                        />

                        <div className="modal-actions">
                            <button className="save-btn" onClick={updateSaree}>
                                Update
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="pagination">
                {/* Previous */}
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="page-btn"
                >
                    <FaRegArrowAltCircleLeft />
                </button>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                        <button
                            key={pageNumber}
                            onClick={() => setPage(pageNumber)}
                            className={`page-btn ${page === pageNumber ? "active" : ""}`}
                        >
                            {pageNumber}
                        </button>
                    );
                })}

                {/* Next */}
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="page-btn"
                >
                    <FaRegArrowAltCircleRight />
                </button>
            </div>

        </div>
    );
}

