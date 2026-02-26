import { useState } from 'react';
import * as LotteryService from '../services/lottery';
import type { Lottery } from '../types';

export function useLottery() {
  const [lottery, setLottery] = useState<Lottery | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const createNewLottery = async (
    lotteryName: string,
    lotteryPrize: string,
  ) => {
    setIsAdding(true);
    try {
      const lottery = await LotteryService.addLottery(
        lotteryName,
        lotteryPrize,
      );

      setLottery(lottery);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
      throw error;
    } finally {
      setIsAdding(false);
    }
  };

  const resetLottery = () => {
    setErrorMessage('');
    setIsAdding(false);
  };

  return {
    lottery,
    errorMessage,
    isAdding,
    createNewLottery,
    resetLottery,
  };
}
