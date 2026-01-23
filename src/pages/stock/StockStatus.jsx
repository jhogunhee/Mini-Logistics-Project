import React from 'react';
import { MapPin, AlertCircle, Package, MoreVertical, Search } from "lucide-react";

export default function StockStatus() {
    // 구역별로 그룹화된 데이터 (실제로는 API에서 가공해서 가져옵니다)
    const zones = [
        {
            name: "냉장고 A (신선)",
            items: [
                { name: "참치마요 삼각김밥", qty: 5, status: "부족" },
                { name: "혜자 도시락", qty: 0, status: "품절" },
                { name: "전주비빔 삼각김밥", qty: 12, status: "정상" },
            ]
        },
        {
            name: "워크인 냉장고 (음료)",
            items: [
                { name: "코카콜라 500ml", qty: 24, status: "정상" },
                { name: "바나나우유", qty: 8, status: "정상" },
                { name: "칸타타 커피", qty: 3, status: "부족" },
            ]
        },
        {
            name: "진열대 B (과자)",
            items: [
                { name: "포카칩 양파맛", qty: 12, status: "정상" },
                { name: "프링글스 오리지널", qty: 2, status: "부족" },
            ]
        }
    ];

    return (
        <div className="space-y-6">
            {/* 상단 검색 및 필터 */}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="위치 또는 상품명 검색..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none"
                    />
                </div>
                <div className="flex gap-2">
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                        <AlertCircle size={14} className="text-amber-500" /> 재고 부족 3건
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-medium ml-2">
                        <Package size={14} className="text-red-500" /> 품절 1건
                    </span>
                </div>
            </div>

            {/* 위치별 그리드 레이아웃 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {zones.map((zone, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        {/* Zone Header */}
                        <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-indigo-600 rounded-lg text-white">
                                    <MapPin size={16} />
                                </div>
                                <h3 className="font-bold text-slate-800 text-sm">{zone.name}</h3>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600">
                                <MoreVertical size={16} />
                            </button>
                        </div>

                        {/* Item List */}
                        <div className="p-2 flex-1">
                            {zone.items.map((item, itemIdx) => (
                                <div
                                    key={itemIdx}
                                    className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors group"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                                        <span className={`text-[11px] font-bold ${
                                            item.status === '품절' ? 'text-red-500' :
                                                item.status === '부족' ? 'text-amber-500' : 'text-slate-400'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-mono font-bold text-slate-600">
                                            {item.qty}<span className="text-[10px] font-normal ml-0.5">개</span>
                                        </span>
                                        {/* 빠른 수정 버튼 (호버 시 노출) */}
                                        <button className="opacity-0 group-hover:opacity-100 p-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-500 shadow-sm transition-opacity">
                                            수정
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Zone Footer */}
                        <button className="w-full py-3 text-[12px] font-bold text-indigo-600 bg-indigo-50/50 hover:bg-indigo-50 transition-colors">
                            {zone.name} 상세 보기
                        </button>
                    </div>
                ))}

                {/* 구역 추가 카드 */}
                <button className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 text-slate-400 hover:border-indigo-300 hover:text-indigo-400 hover:bg-indigo-50/30 transition-all group">
                    <div className="p-3 rounded-full bg-slate-50 group-hover:bg-indigo-50 mb-3 transition-colors">
                        <Package size={24} />
                    </div>
                    <span className="text-sm font-bold">새 구역 추가</span>
                </button>
            </div>
        </div>
    );
}