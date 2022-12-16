import {
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { WheelEvent } from "react"

import { Site } from "src/constants/models"

interface SiteDetailsProps {
  site: Site
}

const SiteDetails = ({ site }: SiteDetailsProps) => {
  const handleWheel = (e: WheelEvent<HTMLDivElement>) =>
    (e.target as EventTarget & HTMLDivElement).blur()

  const props = {
    inputProps: { readOnly: true },
    fullWidth: true,
  }

  return (
    <Card sx={{ p: { xs: 2, md: 4 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4">Construction Site Details</Typography>
          <Typography color="textSecondary" sx={{ mb: 2 }}>
            Change the details and save
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "inline",
            textAlign: { xs: "left", md: "right" },
            mb: { xs: 2, md: 0 },
          }}
        >
          <Typography sx={{ display: "inline" }}>
            {site.isActive ? "Active" : "Inactive"} Site
          </Typography>
          <Switch
            checked={site.isActive}
            disabled
            name="isActive"
            color="primary"
            inputProps={{ "aria-label": "controlled" }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField label="Name" name="name" value={site.name} {...props} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Address"
            name="address"
            value={site.address}
            {...props}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DatePicker
            label="Completion Date"
            value={site.completionDate}
            onChange={(n) => null}
            renderInput={(params) => <TextField {...params} fullWidth />}
            readOnly
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            label="Agreement Info"
            name="agreementInfo"
            value={site.agreementInfo}
            multiline
            {...props}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DatePicker
            label="Agreement Date"
            value={site.agreementDate}
            onChange={(n) => null}
            renderInput={(params) => <TextField {...params} fullWidth />}
            readOnly
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            label="Tender Info"
            name="tenderInfo"
            value={site.tenderInfo}
            multiline
            {...props}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="BOQ Cost"
            name="boqCost"
            value={site.boqCost}
            type="number"
            onWheel={handleWheel}
            {...props}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            label="Work Name"
            name="workName"
            value={site.workName}
            multiline
            {...props}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField label="Fund" name="fund" value={site.fund} {...props} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Estimated Cost"
            name="estimatedCost"
            value={site.estimatedCost}
            type="number"
            onWheel={handleWheel}
            {...props}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField label="Rate" name="rate" value={site.rate} {...props} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Agreement Value"
            name="agreementValue"
            value={site.agreementValue}
            type="number"
            onWheel={handleWheel}
            {...props}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            label="Department"
            name="department"
            value={site.department}
            {...props}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel htmlFor="agency">Agency</InputLabel>
            <Select
              id="agency"
              value={site.agency}
              name="agency"
              label="Agency"
              readOnly
            >
              <MenuItem value="Cash">Pole Star Enterprises</MenuItem>
              <MenuItem value="UPI">Manoj Kumar</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Comments"
            name="comments"
            value={site.comments}
            multiline
            {...props}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Created At"
            name="createdAt"
            value={site.createdAt}
            {...props}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Updated At"
            name="updatedAt"
            value={site.updatedAt}
            {...props}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField label="Site ID" name="siteId" value={site.ID} {...props} />
        </Grid>
      </Grid>
    </Card>
  )
}
export default SiteDetails
