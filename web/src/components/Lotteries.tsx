import { Casino } from '@mui/icons-material';
import { Box, CircularProgress, Typography } from '@mui/material';
import LotteryCard from './LotteryCard';
import type { Lottery } from '../types';

type LotteriesProps = {
  loading: boolean;
  hasLotteries: boolean;
  lotteries: Lottery[];
  selectedLotteries: string[];
  onSelectLottery: (id: string) => void;
};

export default function Lotteries({
  loading,
  hasLotteries,
  lotteries,
  selectedLotteries,
  onSelectLottery,
}: LotteriesProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        maxWidth: '1000px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          mb: 2,
        }}
      >
        <Typography variant="h2" component="span">
          Lotteries
        </Typography>
        <Casino
          sx={{ fontSize: (theme) => theme.typography.h2.fontSize }}
          aria-hidden
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          width: '100%',
        }}
      >
        {loading ? (
          <CircularProgress size="6rem" />
        ) : !hasLotteries ? (
          <Typography variant="h6">No lotteries found</Typography>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 2,
              width: '100%',
            }}
          >
            {lotteries.map((lottery, index) => {
              const isLastItemAloneInRow =
                index === lotteries.length - 1 && lotteries.length % 3 === 1;
              const card = (
                <LotteryCard
                  key={lottery.id}
                  lottery={lottery}
                  selected={selectedLotteries.includes(lottery.id)}
                  onSelect={() => onSelectLottery(lottery.id)}
                />
              );
              if (isLastItemAloneInRow) {
                return (
                  <Box
                    key={lottery.id}
                    sx={{
                      gridColumn: '1 / -1',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {card}
                  </Box>
                );
              }
              return card;
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
}
