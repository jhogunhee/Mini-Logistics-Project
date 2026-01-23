import React, { useState, useEffect } from 'react';
import {
    Barcode,
    CheckCircle2,
    AlertCircle,
    ChevronLeft,
    Save,
    RotateCcw,
    PackageCheck
} from "lucide-react";

export default function InboundCheck() {
    // 실제 서비스에서는 URL 파라미터나 상태 관리(Redux/Zustand)를 통해 입고 예정 데이터를 가져옵니다.
    const [checkList, setCheckList] = useState([
        { id: 101, name: "참치마요 삼각김밥", category: "신선식품", expected: 10, actual: 10 },
        { id: 102, name: "펩시제로 500ml", category: "음료", expected: 24, actual: 0 }, // 아직 검수 전
        { id: 103, name: "포카칩 양파맛", category: "과자", expected: 12, actual: 12 },
        { id: 104, name: "혜자 도시락 (제육)", category: "신선식품", expected: 5, actual: 4 }, // 수량 부족 상황 가정
    ]);

    // 수량 변경 핸들러
    const handleQtyChange = (id, value) => {
        setCheckList(prev => prev.map(item =>
            item.id === id ? { ...item, actual: parseInt(value) || 0 } : item
        ));
    };

    // 전체 일치 버튼 (빠른 검수)
    const handleAllMatch = () => {
        setCheckList(prev => prev.map(item => ({ ...item, actual: item.expected })));
    };

    return (
        <div className="flex flex-col h-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* 상단 액션바 */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                        <ChevronLeft size={24} />
                    </button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-slate-800">상품 검수 및 확정</h2>
                            <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-md font-bold uppercase">Step 2</span>
                        </div>
                        <p className="text-sm text-slate-500">GS 리테일 물류센터 (IN-2026-0121) 항목을 검수 중입니다.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleAllMatch}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
                    >
                        <RotateCcw size={16} /> 전체 수량 일치
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white bg-indigo-600 rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
                        <Save size={16} /> 검수 완료 및 재고 반영
                    </button>
                </div>
            </div>

            {/* 검수 도구 (바코드 스캔 가상 영역) */}
            <div className="bg-indigo-600 rounded-2xl p-6 text-white flex items-center justify-between shadow-xl shadow-indigo-100">
                <div className="flex items-center gap-5">
                    <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md">
                        <Barcode size={32} />
                    </div>
                    <div>
                        <p className="text-indigo-100 text-sm font-medium">바코드 스캔 모드 활성화됨</p>
                        <h3 className="text-xl font-bold text-white mt-1">상품의 바코드를 스캔하여 수량을 확인하세요.</h3>
                    </div>
                </div>
                <div className="bg-white/10 px-6 py-3 rounded-xl border border-white/20 backdrop-blur-sm">
                    <p className="text-[10px] text-indigo-200 uppercase font-bold tracking-widest mb-1 text-center">전체 검수 진행률</p>
                    <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-white w-[75%] transition-all duration-1000"></div>
                        </div>
                        <span className="font-black text-lg">75%</span>
                    </div>
                </div>
            </div>

            {/* 검수 리스트 테이블 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-1">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-100">
                    <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        <th className="px-8 py-4">상품 정보</th>
                        <th className="px-6 py-4 text-center">발주(예정)</th>
                        <th className="px-6 py-4 text-center">실제 입고</th>
                        <th className="px-8 py-4 text-right">상태</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {checkList.map((item) => {
                        const isMismatch = item.actual !== 0 && item.actual !== item.expected;
                        const isMatch = item.actual === item.expected;

                        return (
                            <tr key={item.id} className={`transition-colors ${isMismatch ? "bg-red-50/50" : "hover:bg-slate-50/50"}`}>
                                <td className="px-8 py-5">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-800">{item.name}</span>
                                        <span className="text-[11px] text-slate-400 mt-0.5">{item.category}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-center">
                                        <span className="inline-block px-3 py-1 bg-slate-100 rounded-lg text-xs font-mono font-bold text-slate-500">
                                            {item.expected}
                                        </span>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex justify-center">
                                        <input
                                            type="number"
                                            value={item.actual}
                                            onChange={(e) => handleQtyChange(item.id, e.target.value)}
                                            className={`w-20 text-center py-2 border-2 rounded-xl font-black transition-all outline-none ${
                                                isMatch ? "border-green-200 text-green-600 focus:border-green-500" :
                                                    isMismatch ? "border-red-200 text-red-600 focus:border-red-500" :
                                                        "border-slate-100 text-slate-400 focus:border-indigo-500"
                                            }`}
                                        />
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex justify-end items-center gap-2">
                                        {isMatch && (
                                            <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                                <CheckCircle2 size={14} />
                                                <span className="text-[11px] font-bold uppercase">일치</span>
                                            </div>
                                        )}
                                        {isMismatch && (
                                            <div className="flex items-center gap-1.5 text-red-600 bg-red-50 px-3 py-1 rounded-full animate-pulse">
                                                <AlertCircle size={14} />
                                                <span className="text-[11px] font-bold uppercase">수량 불일치</span>
                                            </div>
                                        )}
                                        {!isMatch && !isMismatch && (
                                            <span className="text-[11px] text-slate-300 font-bold uppercase">대기 중</span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            {/* 하단 요약 안내 */}
            <div className="bg-slate-800 rounded-2xl p-5 flex justify-between items-center text-white shadow-lg">
                <div className="flex items-center gap-4">
                    <PackageCheck className="text-indigo-400" size={24} />
                    <p className="text-sm font-medium text-slate-300">
                        검수 완료 버튼을 누르면 <span className="text-white font-bold underline">실시간 재고 현황</span>에 즉시 반영되며 매입 전표가 생성됩니다.
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">총 검수 품목</p>
                    <p className="text-lg font-black">{checkList.length}건 중 {checkList.filter(i => i.actual === i.expected).length}건 완료</p>
                </div>
            </div>
        </div>
    );
}