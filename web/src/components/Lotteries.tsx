import {
  Casino,
  Search,
  SearchOff,
  SentimentVeryDissatisfied,
} from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import LotteryCard from './LotteryCard';
import type { Lottery } from '../types';
import { useState } from 'react';

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
  const [filterLottery, setFilterLottery] = useState<string>('');
  const filteredLotteries = lotteries.filter((lottery) =>
    lottery.name.toLowerCase().includes(filterLottery.toLowerCase()),
  );
  const hasFilteredLotteries = filteredLotteries.length > 0;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        minHeight: '100%',
        maxWidth: '1000px',
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 2,
          mb: 2,
          flexShrink: 0,
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
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
        <TextField
          sx={{ mt: 2, width: (theme) => theme.spacing(40) }}
          variant="standard"
          label="Filter"
          placeholder="Filter lotteries"
          value={filterLottery}
          onChange={(e) => setFilterLottery(e.target.value.toLowerCase())}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flex: 1,
          width: '100%',
          minHeight: 0,
        }}
      >
        {loading ? (
          <CircularProgress size="6rem" />
        ) : !hasLotteries ? (
          <>
            <SentimentVeryDissatisfied
              sx={{ fontSize: (theme) => theme.typography.h6.fontSize }}
              aria-hidden
            />
            <Typography variant="h6">No lotteries found</Typography>
          </>
        ) : hasFilteredLotteries ? (
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
            {filteredLotteries.map((lottery, index) => {
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
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              mt: 6,
            }}
          >
            <SearchOff
              sx={{
                width: '4rem',
                height: '4rem',
                fontSize: (theme) => theme.typography.h6.fontSize,
              }}
              aria-hidden
            />
            <Typography variant="h6">
              No search results for '{filterLottery}'
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
