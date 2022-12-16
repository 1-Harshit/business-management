import { LoadingButton } from "@mui/lab"
import {
  Card,
  Container,
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
import Head from "next/head"
import SaveIcon from "@mui/icons-material/Save"
import { ChangeEvent, WheelEvent, useState } from "react"

import PageTitle from "src/components/PageTitle"
import { Site } from "src/constants/models"
import SidebarLayout from "src/layouts/SidebarLayout"

const SiteEdit = () => {
  const [values, setValues] = useState<Site>({} as Site)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleSubmit = () => {
    setIsLoading(true)
    // console.log(values)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const handleWheel = (e: WheelEvent<HTMLDivElement>) =>
    (e.target as EventTarget & HTMLDivElement).blur()

  const props = {
    fullWidth: true,
    onChange: handleInputChange,
    disabled: isLoading,
  }

  return (
    <>
      <Head>
        <title>Edit a Site</title>
      </Head>
      <PageTitle
        heading={`Edit the ${values.name} Construction Site`}
        subHeading={`Edit the construction site with id ${values.ID}`}
      />
      <Container maxWidth="lg">
        <Card sx={{ p: { xs: 2, md: 4 } }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4">Edit a Construction Site</Typography>
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
                {values.isActive ? "Active" : "Inactive"} Site
              </Typography>
              <Switch
                checked={values.isActive}
                onChange={(e, checked) => {
                  setValues({
                    ...values,
                    isActive: checked,
                  })
                }}
                name="isActive"
                color="primary"
                inputProps={{ "aria-label": "controlled" }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Name"
                name="name"
                value={values.name}
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Address"
                name="address"
                value={values.address}
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DatePicker
                label="Completion Date"
                value={values.completionDate}
                onChange={(newDate) =>
                  setValues({ ...values, completionDate: newDate as Date })
                }
                renderInput={(params) => <TextField {...params} fullWidth />}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                label="Agreement Info"
                name="agreementInfo"
                value={values.agreementInfo}
                multiline
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DatePicker
                label="Agreement Date"
                value={values.agreementDate}
                onChange={(newDate) =>
                  setValues({ ...values, agreementDate: newDate as Date })
                }
                renderInput={(params) => <TextField {...params} fullWidth />}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                label="Tender Info"
                name="tenderInfo"
                value={values.tenderInfo}
                multiline
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="BOQ Cost"
                name="boqCost"
                value={values.boqCost}
                type="number"
                onWheel={handleWheel}
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                label="Work Name"
                name="workName"
                value={values.workName}
                multiline
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Fund"
                name="fund"
                value={values.fund}
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Estimated Cost"
                name="estimatedCost"
                value={values.estimatedCost}
                type="number"
                onWheel={handleWheel}
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Rate"
                name="rate"
                value={values.rate}
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Agreement Value"
                name="agreementValue"
                value={values.agreementValue}
                type="number"
                onWheel={handleWheel}
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                label="Department"
                name="department"
                value={values.department}
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel htmlFor="agency">Agency</InputLabel>
                <Select
                  id="agency"
                  value={values.agency}
                  onChange={(e) =>
                    setValues({ ...values, agency: e.target.value as string })
                  }
                  name="agency"
                  label="Agency"
                  disabled={isLoading}
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
                value={values.comments}
                multiline
                {...props}
              />
            </Grid>
            <Grid item xs={12} md={4} />
            <Grid item xs={12} md={4}>
              <LoadingButton
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                loading={isLoading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
              >
                Save Changes
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  )
}

SiteEdit.layout = SidebarLayout

export default SiteEdit
