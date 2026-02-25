import { useState } from 'react';
import * as LotteryService from '../services/lottery';

export function useRegisterLottery() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');

  const registerLottery = async (name: string, lotteries: string[]) => {
    setIsRegistering(true);
    setRegisterErrorMessage('');
    Promise.all(
      lotteries.map(async (lotteryId) => {
        await LotteryService.registerLottery(name, lotteryId);
      }),
    )
      .then(() => {
        setIsRegistering(false);
      })
      .catch((error) => {
        setIsRegistering(false);
        if (error instanceof Error) {
          setRegisterErrorMessage(error.message);
        }
      });
  };

  const resetRegisterLottery = () => {
    setRegisterErrorMessage('');
    setIsRegistering(false);
  };

  return {
    isRegistering,
    registerErrorMessage,
    registerLottery,
    resetRegisterLottery,
  };
}
