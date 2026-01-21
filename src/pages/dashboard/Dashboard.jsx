import React from 'react';
import { TrendingUp, Box, AlertCircle, ArrowUpRight, Clock } from "lucide-react";

const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-start mb-3">
            <div className={`p-2 rounded-lg bg-slate-50 ${color}`}>
                <Icon size={18} />
            </div>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${change.includes('+') ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'}`}>
                {change}
            </span>
        </div>
        <div className="text-[11px] text-slate-500 font-medium">{title}</div>
        <div className="text-lg font-bold text-slate-800 mt-0.5">{value}</div>
    </div>
);

export default function Dashboard() {
    return (
        <div className="space-y-6">
            {/* 상단 요약 현황 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="오늘의 매출" value="1,240,500원" change="+12.5%" icon={TrendingUp} color="text-blue-600" />
                <StatCard title="미검수 입고" value="3건" change="신규" icon={Box} color="text-amber-600" />
                <StatCard title="유통기한 임박" value="12건" change="주의" icon={AlertCircle} color="text-red-600" />
                <StatCard title="방문 고객수" value="342명" change="+5.2%" icon={ArrowUpRight} color="text-indigo-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 실시간 폐기/유통기한 리스트 */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                            <Clock size={16} className="text-red-500" />
                            긴급 유통기한 관리
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50/50 text-[11px] text-slate-400 uppercase font-bold">
                            <tr>
                                <th className="px-5 py-3">상품명</th>
                                <th className="px-5 py-3">수량</th>
                                <th className="px-5 py-3">만료시간</th>
                                <th className="px-5 py-3 text-right">상태</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-[13px]">
                            {[
                                { name: "참치마요 삼각김밥", qty: 5, time: "22:00", status: "긴급" },
                                { name: "매일우유 500ml", qty: 2, time: "23:30", status: "주의" },
                                { name: "전주비빔 삼각김밥", qty: 3, time: "22:00", status: "긴급" },
                            ].map((item, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-5 py-3 font-medium text-slate-700">{item.name}</td>
                                    <td className="px-5 py-3 text-slate-500">{item.qty}개</td>
                                    <td className="px-5 py-3 text-slate-500">{item.time}</td>
                                    <td className="px-5 py-3 text-right">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.status === '긴급' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                                                {item.status}
                                            </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 알림 섹션 */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider">공지 및 알림</h4>
                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                            <div>
                                <p className="text-[13px] font-medium text-slate-700">내일 오전 비 예보</p>
                                <p className="text-[11px] text-slate-400 mt-0.5">우산 및 우의 재고를 확인하세요.</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5"></div>
                            <div>
                                <p className="text-[13px] font-medium text-slate-700">본사 물류 지연 공지</p>
                                <p className="text-[11px] text-slate-400 mt-0.5">상온 상품 입고가 1시간 지연됩니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}