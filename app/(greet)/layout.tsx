import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const GreetLayout = ({
    children
} : {
    children: React.ReactNode
}) => {
    return (
        <div className="bg-slate-100">
            <Navbar />
            <main className="pt-36 pb-20 bg-slate-100">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default GreetLayout;