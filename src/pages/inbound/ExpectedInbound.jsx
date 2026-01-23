import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import api from '@/utils/axios'; // @가 /src를 의미함
import {Calendar, Truck} from "lucide-react";
import SearchBar, {SearchItem} from '@/components/common/SearchBar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/datepicker-custom.css"; // 커스텀 스타일
import {ko} from "date-fns/locale";

export default function ExpectedInbound() {
    const [masterRowData, setMasterRowData] = useState([]);
    const [detailRowData, setDetailRowData] = useState([]);
    const [searchCond, setSearchCond] = useState({
        expectDt: new Date().toISOString().split('T')[0],
        inbNo: '',
        prodNm: ''
    });

    // 1. 데이터 로드 로직 (Axios 활용)
    const fetchInboundList = useCallback(async () => {
        const { expectDt, inbNo, prodNm } = searchCond;

        const data = await api.get('/inbound/expectInbMasterList', {
            params: {
                storeId: 'ST_SEOUL01',
                expectDt: expectDt.replaceAll('-', ''),
                inbNo: inbNo,
                prodNm: prodNm,
            },
        });

        setMasterRowData(data);

    }, [searchCond]);

    // 페이지 진입 시 최초 1회 로드
    useEffect(() => {
        fetchInboundList();
    }, [fetchInboundList]);

    const masterColumnDefs = [
        {
            headerName: "입고번호",
            field: "INB_NO",
            width: 160,
        },
        {
            headerName: "입고예정일",
            field: "INB_EXPECT_DT",
            width: 110,
            cellClass: 'text-center',
            valueFormatter: (params) => {
                if (!params.value) return '';

                if (typeof params.value === 'string' && params.value.length === 8) {
                    return `${params.value.substring(0, 4)}-${params.value.substring(4, 6)}-${params.value.substring(6, 8)}`;
                }
            }
        },
        {
            headerName: "입고예정 수량(단위)",
            field: "TOTAL_ITEM_QTY",
            width: 150,
            cellClass: 'ag-right-aligned-cell' // 우측 정렬
        },
        {
            headerName: "진행상태",
            field: "INB_MST_STAT",
            width: 100,
            cellRenderer: (p) => (
                <div className="flex items-center h-full">
                <span className={`px-2 py-0.5 rounded border text-[11px] font-bold ${
                    p.value === '30' // 입고완료
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        : 'bg-blue-50 text-blue-600 border-blue-100' // 20:부분입고 등
                }`}>
                    {p.value === '30' ? '입고완료' : '부분입고'}
                </span>
                </div>
            )
        },
        { headerName: "등록자", field: "REG_ID", width: 100 },
    ];

    // 1. 마스터 행 클릭 시 상세 데이터를 가져오는 함수 (로딩 로직 제거)
    const fetchDetailData = useCallback(async (inbNo) => {
        try {
            const response = await api.get('/inbound/expectInbDetailList', {
                params: { inbNo: inbNo }
            });
            // Axios 응답 데이터 설정 (보통 response.data)
            setDetailRowData(Array.isArray(response) ? response : response.data);
        } catch (error) {
            console.error("상세 내역 로드 실패:", error);
            setDetailRowData([]);
        }
    }, []);

    const detailColumnDefs = useMemo(() => [
        {field: 'CATEGORY_NM', headerName: '카테고리', width: 130},
        {field: 'PROD_NM', headerName: '상품명', width: 300},
        {field: 'EXPECT_QTY', headerName: '예정수량(단위)', width: 150, cellClass: 'ag-right-aligned-cell'},
        {field: 'TOTAL_EA_QTY', headerName: '재고반영(낱개)', width: 150, cellStyle: {color: '#4f46e5', fontWeight: '800'}, cellClass: 'ag-right-aligned-cell'},
        {
            field: 'INB_DTL_STAT',
            headerName: '입고상태',
            width: 110,
            cellRenderer: (p) => (
                <div className="flex h-full items-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        p.data.INB_DTL_STAT === 'COMP'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100' // 완료 (Emerald)
                            : p.data.INB_DTL_STAT === 'ING'
                                ? 'bg-blue-50 text-blue-600 border-blue-100'      // 진행 (Blue)
                                : 'bg-slate-100 text-slate-500 border-slate-200'  // 대기 (Slate)
                    }`}>
                        {p.value}
                    </span>
                </div>
            )
        },
    ], []);

    return (
        <div className="flex flex-col h-full space-y p bg-slate-50/50">
            <div className="flex flex-col h-screen p-4 bg-slate-50 overflow-hidden">
                {/* 타이틀 영역 */}
                <div className="flex-none mb-2">
                    <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                        <Truck className="text-indigo-600" size={24} /> 입고 예정
                    </h2>
                </div>

                {/* 검색바 영역 */}
                <div className="flex-none mb-4">
                    <SearchBar onSearch={fetchInboundList} required>
                        <SearchItem label="입고예정일">
                            <div className="flex items-center w-full relative group">
                                <DatePicker
                                    value={searchCond.EXPCT_DT}
                                    selected={searchCond.expectDt}
                                    onChange={(date) => {
                                        const formatted = date.toISOString().split('T')[0]; // 간편한 변환 방식
                                        setSearchCond(prev => ({ ...prev, expectDt: formatted }));
                                    }}
                                    dateFormat="yyyy-MM-dd"
                                    locale={ko}
                                    portalId="root-portal"
                                    className="datepicker-input w-full pr-8 cursor-pointer"
                                />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                                    <Calendar size={14} className="text-slate-400" />
                                </div>
                            </div>
                        </SearchItem>
                        <SearchItem label="입고번호">
                            <input
                                type="text"
                                value={searchCond.INB_NO}
                                onChange={(e) =>
                                    setSearchCond((prev) => ({
                                        ...prev,
                                        inbNo: e.target.value,
                                    }))
                                }
                                placeholder="번호 입력"
                                className="w-full border-none p-0 focus:ring-0 bg-transparent text-sm font-bold"
                            />
                        </SearchItem>
                        <SearchItem label="상품명">
                            <input
                                type="text"
                                value={searchCond.PROD_NM}
                                onChange={(e) =>
                                    setSearchCond((prev) => ({
                                        ...prev,
                                        prodNm: e.target.value,
                                    }))
                                }
                                placeholder="상품명 입력"
                                className="w-full border-none p-0 focus:ring-0 bg-transparent text-sm font-bold"
                            />
                        </SearchItem>
                    </SearchBar>
                </div>

                {/* 마스터 그리드 (상단 35%) */}
                <div className="h-[35%] flex flex-col bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="p-2 bg-slate-50 border-b text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        입고 전표 목록 (마스터)
                    </div>
                    {/* 중요: ag-theme-alpine에 flex-1과 높이가 반드시 있어야 함 */}
                    <div className="flex-1 ag-theme-alpine w-full">
                        <AgGridReact
                            rowData={masterRowData}
                            columnDefs={masterColumnDefs}
                            rowSelection="single"
                            onRowClicked={(e) => fetchDetailData(e.data.INB_NO)}
                            onGridReady={(params) => params.api.sizeColumnsToFit()}
                        />
                    </div>
                </div>

                {/* 디테일 그리드 (하단 나머지 전체) */}
                <div className="flex-1 min-h-0 mt-4 flex flex-col bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="p-2 bg-slate-50 border-b text-[11px] font-bold text-slate-500 flex justify-between items-center">
                        <span>상세 품목 내역</span>
                    </div>
                    <div className="flex-1 ag-theme-alpine w-full">
                        <AgGridReact
                            rowData={detailRowData}
                            columnDefs={detailColumnDefs}
                            pagination={true}
                            paginationPageSize={10}
                            onGridReady={(params) => params.api.sizeColumnsToFit()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}