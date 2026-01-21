import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

export default function Layout() {
    return (
        <div className="flex min-h-screen w-full bg-slate-50">
            <Sidebar />
            <main className="flex-1 min-w-0 flex flex-col">
                {/* 상단바 (Breadcrumbs나 검색창을 넣기 좋음) */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8">
                    {/*<h1 className="text-sm font-medium text-slate-500"> 메뉴 url 예정 </h1>*/}
                </header>

                {/* 실제 콘텐츠 영역 */}
                <div className="p-8">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[calc(100vh-8rem)] p-6">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}