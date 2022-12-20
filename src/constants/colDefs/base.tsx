import { Grid, IconButton, Tooltip, Typography } from "@mui/material"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"

const MIN_WIDTH = 175

// Render Amount in format ₹1,56,756.56
const formatAmount = (amount: string | number) =>
  `₹${Number(amount).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  })}`

// Cell with link and rate
const gridCell = (
  { name = "-", _id = "" }: { name: string; _id: string },
  type: string,
  rate?: number
) => (
  <Grid container spacing={0}>
    <Grid item xs={12}>
      {name}{" "}
      {_id && (
        <IconButton href={`/admin/${type}/${_id}`}>
          <OpenInNewIcon sx={{ fontSize: 13 }} color="disabled" />
        </IconButton>
      )}
    </Grid>
    {rate && (
      <Grid item xs={12}>
        <Typography variant="caption" color="text.secondary">
          @{formatAmount(rate)}
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
          {text.substring(0, 23)}
          {text.length > 23 && "..."}
        </Typography>
      </Tooltip>
    )
  return <Typography>-</Typography>
}

const formatDate = (date: string) => {
  const dateObj = new Date(date)
  const now = new Date()

  if (dateObj.toString() === "Invalid Date") return date

  if (dateObj.toDateString() === now.toDateString())
    return dateObj.toLocaleTimeString()

  return dateObj.toLocaleString()
}

export { gridCell, gridCellTooltip, formatAmount, formatDate, MIN_WIDTH }
