import { Grid, IconButton, Tooltip, Typography } from "@mui/material"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"

const MIN_WIDTH = 150

// Render Amount in format ₹1,56,756.56
const renderAmount = (amount: string | number) =>
  `₹${Number(amount).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  })}`

// Cell with link and rate
const gridCell = (
  { name = "NA", ID = 0 }: { name: string; ID: number },
  type: string,
  rate?: number
) => (
  <Grid container spacing={0}>
    <Grid item xs={12}>
      {name}{" "}
      {ID !== 0 && (
        <IconButton href={`/admin/${type}/${ID}`}>
          <OpenInNewIcon sx={{ fontSize: 13 }} color="disabled" />
        </IconButton>
      )}
    </Grid>
    {rate && (
      <Grid item xs={12}>
        <Typography variant="caption" color="text.secondary">
          @{renderAmount(rate)}
        </Typography>
      </Grid>
    )}
  </Grid>
)

// Cell with tooltip/overflow
const gridCellTooltip = (text: string) => {
  if (text)
    return (
      <Tooltip title={text}>
        <Typography>
          {text.substring(0, 20)}
          {text.length > 20 && "..."}
        </Typography>
      </Tooltip>
    )
  return <Typography>NA</Typography>
}

export { gridCell, gridCellTooltip, renderAmount, MIN_WIDTH }
