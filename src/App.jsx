import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";

import Layout from "./layout/Layout";
import Login from "./pages/auth/Login";
import AuthRoute from "./components/auth/AuthRoute.jsx";
import Dashboard from "@/pages/dashboard/Dashboard.jsx";
import StockStatus from "@/pages/stock/StockStatus.jsx";
import ExpectInbound from "@/pages/inbound/ExpectedInbound.jsx";
import InboundCheck from "@/pages/inbound/InboundCheck.jsx";

export default function App() {
    return (
        <>
            <Toaster position="top-right"/>
            <BrowserRouter>
                <Routes>
                    {/* 로그인 */}
                    <Route path="/login" element={<Login/>}/>

                    {/* 로그인 이후 영역 */}
                    <Route element={
                        <AuthRoute>
                            <Layout/>
                        </AuthRoute>
                    }>
                        {/* 로그인 후 최초 진입 */}
                        <Route index element={<Dashboard />} />
                        <Route path="/stock/status" element={<StockStatus />} />
                        <Route path="/inbound/expected" element={<ExpectInbound />} />
                        <Route path="/inbound/check" element={<InboundCheck />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

