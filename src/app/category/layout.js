import "../globals.css";
import Header from "@/component/Header";
import Sidebar from "@/component/sidebar";


export default function AdminLayout({ children }) {
    return (
        <>
            <Header />
            <Sidebar />
            {children}
        </>
    );
}
