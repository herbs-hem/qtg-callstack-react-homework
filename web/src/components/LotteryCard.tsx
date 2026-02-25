import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import type { Lottery } from '../types';
import { Sync, Done } from '@mui/icons-material';

type LotteryCardProps = {
  lottery: Lottery;
  selected: boolean;
  onSelect: () => void;
};
export default function LotteryCard({
  lottery,
  selected,
  onSelect,
}: LotteryCardProps) {
  const statusIcon =
    lottery.status === 'running' ? (
      <Sync sx={{ color: 'text.primary' }} />
    ) : (
      <Done sx={{ color: 'text.primary' }} />
    );
  const isDisabled = lottery.status === 'finalized';
  const handleSelect = () => {
    if (isDisabled) return;
    onSelect();
  };
  return (
    <Card
      variant="outlined"
      sx={{
        m: 1,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: isDisabled ? 'action.hover' : 'background.paper',
        boxShadow: (theme) =>
          selected ? `0 0 10px 0 ${theme.palette.primary.main}` : 'none',
      }}
      onClick={handleSelect}
    >
      <CardHeader action={statusIcon} />
      <CardContent sx={{ textAlign: 'left' }}>
        <Typography variant="h6">{lottery.name}</Typography>
        <Typography variant="body1">{lottery.prize}</Typography>
        <Typography variant="body1">{lottery.id}</Typography>
      </CardContent>
    </Card>
  );
}
