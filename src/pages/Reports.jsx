import React, { useState } from 'react';
import ReportsGeneral from '../components/ReportsGeneral';
import ReportsItem from '../components/ReportsItem';

const Reports = () => {
    const [selectedTab, setSelectedTab] = useState('general');

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Relatórios</h2>


            <div className="flex gap-4 border-b mb-4">
                <button
                    onClick={() => setSelectedTab('general')}
                    className={`py-2 px-4 ${selectedTab === 'general' ? 'border-b-2 border-blue-500 font-semibold' : 'text-gray-500'}`}
                >
                    Relatório Geral
                </button>

                <button
                    onClick={() => setSelectedTab('item')}
                    className={`py-2 px-4 ${selectedTab === 'item' ? 'border-b-2 border-blue-500 font-semibold' : 'text-gray-500'}`}
                >
                    Relatório por item
                </button>
            </div>


            <div>
                {selectedTab === 'general' && <ReportsGeneral />}
                {selectedTab === 'item' && <ReportsItem />}
            </div>
        </div>
    );
};

export default Reports;
