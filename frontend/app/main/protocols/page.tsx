'use client';

import { useEffect, useState, useCallback } from 'react';
import FilterBar from '@/components/FilterBar';
import QuestionCard from '@/components/QuestionCard';
import Pagination from '@/components/Pagination';
import { QuestionCardSkeleton } from '@/components/LoadingSpinner';
import { questionApi } from '@/lib/api';
import type { Question, FilterState, Pagination as PaginationType } from '@/types';

export default function ProtocolsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    category: 'Communication Protocols',
  });

  const fetchQuestions = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const response = await questionApi.getAll({
        ...filters,
        page,
        limit: 20,
      });

      if (response.success) {
        setQuestions(response.data);
        setPagination(response.pagination);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchQuestions(1);
  }, [fetchQuestions]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters({ ...newFilters, category: 'Communication Protocols' });
  };

  const handlePageChange = (page: number) => {
    fetchQuestions(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const protocols = [
    { name: 'UART', icon: '🔌', desc: 'Universal Asynchronous Receiver Transmitter' },
    { name: 'SPI', icon: '⚡', desc: 'Serial Peripheral Interface' },
    { name: 'I2C', icon: '🔗', desc: 'Inter-Integrated Circuit' },
    { name: 'CAN', icon: '🚗', desc: 'Controller Area Network' },
    { name: 'LIN', icon: '📡', desc: 'Local Interconnect Network' },
    { name: 'Modbus', icon: '🏭', desc: 'Industrial Communication' },
    { name: 'MQTT', icon: '☁️', desc: 'IoT Messaging Protocol' },
    { name: 'BLE', icon: '📶', desc: 'Bluetooth Low Energy' },
    { name: 'LoRa', icon: '📡', desc: 'Long Range Wireless' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">📡</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Communication Protocols</h1>
        </div>
        <p className="text-foreground-secondary max-w-3xl">
          Master communication protocols used in embedded systems and IoT. 
          From wired protocols like I2C, SPI, UART to wireless like BLE, LoRa, and MQTT.
        </p>
      </div>

      {/* Protocol Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {protocols.map((protocol) => (
          <button
            key={protocol.name}
            onClick={() => handleFilterChange({ ...filters, subcategory: protocol.name })}
            className={`p-4 rounded-xl border text-left transition-all hover:border-primary/50 ${
              filters.subcategory === protocol.name
                ? 'bg-primary/10 border-primary/50'
                : 'bg-card border-card-border'
            }`}
          >
            <span className="text-2xl mb-2 block">{protocol.icon}</span>
            <h3 className="font-semibold text-foreground text-sm">{protocol.name}</h3>
            <p className="text-xs text-foreground-muted mt-1">{protocol.desc}</p>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-8">
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          totalResults={pagination?.totalItems}
        />
      </div>

      {/* Questions Grid */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <QuestionCardSkeleton key={i} />
          ))}
        </div>
      ) : questions.length > 0 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))}
          </div>

          {/* Pagination */}
          {pagination && (
            <div className="mt-8">
              <Pagination pagination={pagination} onPageChange={handlePageChange} />
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-card border border-card-border flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No questions found</h3>
          <p className="text-foreground-secondary max-w-md mx-auto">
            Try adjusting your filters to find what you&apos;re looking for.
          </p>
        </div>
      )}
    </div>
  );
}
