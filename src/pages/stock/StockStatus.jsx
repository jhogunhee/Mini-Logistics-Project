import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Search, Download, RefreshCcw, Package, Filter } from "lucide-react";

export default function StockStatus() {
    // 1. 재고 데이터 (실제 서비스에서는 API 호출 결과가 들어갑니다)
    const [rowData] = useState([
        { code: '8801043011223', name: '참치마요 삼각김밥', category: '신선식품', zone: '냉장고 A', price: 1200, qty: 5, status: '부족' },
        { code: '8801055022334', name: '코카콜라 500ml', category: '음료', zone: '워크인 냉장고', price: 2100, qty: 24, status: '정상' },
        { code: '8801111233445', name: '혜자 도시락 (제육)', category: '신선식품', zone: '냉장고 A', price: 5000, qty: 0, status: '품절' },
        { code: '8801099144556', name: '포카칩 양파맛', category: '과자', zone: '진열대 B', price: 1700, qty: 12, status: '정상' },
        { code: '8801022355667', name: '바나나우유 240ml', category: '음료', zone: '냉장고 B', price: 1500, qty: 8, status: '정상' },
        { code: '8801033466778', name: '신라면 용기면', category: '라면', zone: '진열대 C', price: 1150, qty: 30, status: '정상' },
    ]);

    // 2. 컬럼 정의 (UI 렌더링 포함)
    const [columnDefs] = useState([
        {
            field: 'name',
            headerName: '상품 정보',
            flex: 2,
            minWidth: 250,
            // 체크박스 위치와 디자인 살짝 조정
            checkboxSelection: true,
            headerCheckboxSelection: true,
            cellRenderer: (p) => (
                <div className="flex flex-col justify-center h-full py-2">
                    <span className="font-bold text-slate-800 text-[14px]">{p.value}</span>
                    <span className="text-[11px] text-slate-400 font-medium mt-0.5">{p.data.code}</span>
                </div>
            )
        },
        {
            field: 'category',
            headerName: '카테고리',
            flex: 1,
            cellRenderer: (p) => <span className="text-slate-500 font-medium">{p.value}</span>
        },
        {
            field: 'zone',
            headerName: '진열 위치',
            flex: 1,
            cellRenderer: (p) => (
                <div className="flex items-center h-full">
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-semibold border border-slate-200">
                        {p.value}
                    </span>
                </div>
            )
        },
        {
            field: 'price',
            headerName: '판매가',
            flex: 1,
            type: 'rightAligned',
            valueFormatter: p => `${p.value.toLocaleString()}원`,
            cellStyle: { color: '#334155', fontWeight: '500' }
        },
        {
            field: 'qty',
            headerName: '현재고',
            flex: 0.8,
            type: 'centerAligned',
            cellRenderer: (p) => {
                const isCritical = p.value === 0;
                const isWarning = p.value <= 5;
                return (
                    <div className="flex items-center justify-center h-full">
                        <span className={`font-bold ${isCritical ? 'text-red-500' : isWarning ? 'text-amber-500' : 'text-slate-700'}`}>
                            {p.value} <span className="text-[10px] font-normal opacity-50 ml-0.5">개</span>
                        </span>
                    </div>
                );
            }
        },
        {
            field: 'status',
            headerName: '상태',
            flex: 0.8,
            cellRenderer: (p) => {
                const styles = {
                    '정상': 'bg-green-50 text-green-600 border-green-200',
                    '부족': 'bg-amber-50 text-amber-600 border-amber-200',
                    '품절': 'bg-red-50 text-red-600 border-red-200',
                };
                return (
                    <div className="flex items-center h-full">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${styles[p.value]}`}>
                            {p.value}
                        </span>
                    </div>
                );
            }
        },
    ]);

    // 3. 기본 컬럼 설정 (공통 기능)
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true,
    }), []);

    return (
        <div className="flex flex-col h-full animate-in fade-in duration-500">
            {/* 상단 헤더 섹션 */}
            <div className="flex justify-between items-end mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-5 bg-indigo-600 rounded-full"></div>
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">실시간 재고 현황</h2>
                    </div>
                    <p className="text-sm text-slate-500 ml-4">매장 내 모든 상품의 재고와 진열 위치를 관리합니다.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                        <Download size={16} /> 엑셀 다운로드
                    </button>
                    <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
                        <Package size={16} /> 신규 입고 등록
                    </button>
                </div>
            </div>

            {/* 필터 및 검색 바 */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 mb-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="상품명, 바코드 검색..."
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                    />
                </div>
                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Filter size={20} />
                </button>
                <div className="h-6 w-px bg-slate-200"></div>
                <span className="text-[12px] font-medium text-slate-400">
                    현재 필터링 된 품목: <span className="text-indigo-600">{rowData.length}</span>건
                </span>
            </div>

            {/* AG-Grid 영역 */}
            <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ag-theme-alpine custom-grid">
                <div style={{ height: 'calc(100vh - 280px)', width: '100%' }}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        rowSelection={'multiple'}
                        rowHeight={60} // 행 높이를 좀 더 높여서 시원하게 만듭니다
                        headerHeight={50}
                        animateRows={true}
                        suppressCellFocus={true} // 클릭 시 생기는 파란색 테두리 박스 제거
                        // 행 선택 시 색상 유지를 위해 추가
                        rowClassRules={{
                            'selected-row': (params) => params.node.isSelected(),
                        }}
                    />
                </div>
            </div>
        </div>
    );
}