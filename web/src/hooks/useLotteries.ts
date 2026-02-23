import { useEffect, useState } from 'react';
import type { Lottery } from '../types';
import * as LotteryService from '../services/lottery';

export function useLotteries() {
  const [lotteries, setLotteries] = useState<Lottery[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchLotteries = async () => {
    try {
      setLoading(true);
      const lotteries = await LotteryService.fetchLotteries();
      setLotteries(lotteries);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLotteries();
  }, []);

  return { lotteries, loading, error };
}
