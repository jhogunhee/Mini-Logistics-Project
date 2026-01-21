import { NavLink } from "react-router-dom";
import {
    LayoutDashboard, Box, Truck, AlertCircle, Settings, Store,
    History, Zap, FileText, Trash2, Barcode, LineChart, Wallet,
    TrendingUp, Users
} from "lucide-react";

const MenuGroup = ({ title, children }) => (
    <div className="mb-5">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-2 px-4">
            {title}
        </div>
        <div className="space-y-0.5">{children}</div>
    </div>
);

const MenuItem = ({ to, label, icon: Icon, badge }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
            ${
                isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
            }`
        }
    >
        <div className="flex items-center gap-3">
            {Icon && <Icon size={20} />}
            {label}
        </div>
        {badge && (
            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {badge}
            </span>
        )}
    </NavLink>
);

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
            {/* 편의점 로고 영역 */}
            <div className="flex items-center gap-3 px-6 h-20">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-inner">
                    <Store size={24} className="text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 leading-none">GS25 강남점</h3>
                    <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span> 영업 중
                    </p>
                </div>
            </div>

            {/* 메뉴 영역 */}
            <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {/* 1. 모니터링 (기존) */}
                <MenuGroup title="모니터링">
                    <MenuItem to="/" label="대시보드" icon={LayoutDashboard} />
                    <MenuItem to="/stock/status" label="실시간 재고" icon={Box} />
                </MenuGroup>

                {/* 2. 발주 및 입고 (신규) - 편의점의 핵심 작업 */}
                <MenuGroup title="주문 / 입고">
                    <MenuItem to="/order/auto" label="자동 발주 추천" icon={Zap} /> {/* AI 추천 발주 */}
                    <MenuItem to="/order/list" label="발주 내역" icon={FileText} />
                    <MenuItem to="/stock/inbound" label="입고/검수" icon={Truck} />
                </MenuGroup>

                {/* 3. 상품 및 유통기한 (기존 확장) */}
                <MenuGroup title="상품 관리">
                    <MenuItem to="/stock/expiry" label="유통기한 관리" icon={AlertCircle} badge="5" />
                    <MenuItem to="/stock/waste" label="폐기 등록" icon={Trash2} /> {/* 폐기 처리 기능 */}
                    <MenuItem to="/master/product" label="상품 마스터" icon={Barcode} /> {/* 바코드/가격 관리 */}
                </MenuGroup>

                {/* 4. 매출 및 정산 (신규) - 점주님이 가장 궁금해할 부분 */}
                <MenuGroup title="매출 / 정산">
                    <MenuItem to="/sales/daily" label="일일 매출 현황" icon={LineChart} />
                    <MenuItem to="/sales/settlement" label="정산 관리" icon={Wallet} />
                    <MenuItem to="/analysis/hot-items" label="인기 상품 분석" icon={TrendingUp} />
                </MenuGroup>

                {/* 5. 매장 설정 (기존) */}
                <MenuGroup title="설정">
                    <MenuItem to="/settings/store" label="매장 설정" icon={Settings} />
                    <MenuItem to="/settings/staff" label="아르바이트 관리" icon={Users} />
                </MenuGroup>
            </nav>

            {/* 하단 점주님 정보 */}
            <div className="p-4 bg-slate-50 border-t border-slate-200">
                <div className="text-xs text-slate-500 px-2 mb-2 font-medium">관리자 계정</div>
                <div className="flex items-center gap-3 px-2 py-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                        P
                    </div>
                    <span className="text-sm font-semibold text-slate-700">홍길동 점주님</span>
                </div>
            </div>
        </aside>
    );
}