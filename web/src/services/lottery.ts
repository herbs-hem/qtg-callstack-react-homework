import type { Lottery } from '../types';

const handleResponseError = async (response: Response): Promise<never> => {
  const errBody = await response.json().catch(() => ({}));
  const message =
    (errBody as { error?: string }).error ?? 'Failed to add lottery';

  throw new Error(message, {
    cause: { status: response.status, body: errBody },
  });
};

export async function addLottery(
  lotteryName: string,
  lotteryPrize: string,
): Promise<Lottery> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/lotteries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'simple',
        name: lotteryName,
        prize: lotteryPrize,
      }),
    });

    if (!response.ok) {
      await handleResponseError(response);
    }

    const data = (await response.json()) as Lottery;

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('API error:', error.message, error.cause);
    }
    throw error;
  }
}

export async function fetchLotteries(): Promise<Lottery[]> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/lotteries`);

    if (!response.ok) {
      await handleResponseError(response);
    }

    const data = (await response.json()) as Lottery[];
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('API error:', error.message, error.cause);
    }
    throw error;
  }
}

export async function registerLottery(
  name: string,
  lotteryId: string,
): Promise<void> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, lotteryId }),
    });
    if (!response.ok) {
      await handleResponseError(response);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('API error:', error.message, error.cause);
    }
    throw error;
  }
}
