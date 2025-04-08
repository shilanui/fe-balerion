"use client";
import { ROLE, ROLE_COLOR } from "@/constant/role";
import { Card, CardContent, Typography, Grid, Box, Chip } from "@mui/material";
import TextAreaComponent from "../TextField/TextAreaComponent";

const AddTextCardComponent = ({
  userRole,
  userCardNo,
  adminCardNo,
  setContent,
  handleAddCard,
  ...props
}) => {
  return (
    <Card {...props}>
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          pb: "0px",
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          <Grid
            size={{ xs: 4.5, sm: 4, md: 3, lg: 3.5 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              height: "150px",
            }}
          >
            <Box display="flex" flexDirection="column">
              <Typography variant="subtitle2" fontWeight="bold">
                {user?.role == ROLE.USER ? "MEMO-" : "ADMIN-"}
                {(user?.role == ROLE.USER ? +userCardNo : +adminCardNo) + 1}
              </Typography>
              <Chip
                label={user?.role}
                color={ROLE_COLOR[user?.role]}
                size="small"
              />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{
                  cursor: "pointer",
                  textDecoration: "underLine",
                }}
                onClick={handleAddCard}
              >
                SAVE
              </Typography>
            </Box>
          </Grid>
          <Grid
            size={{ xs: 7.5, sm: 8, md: 9, lg: 8.5 }}
            sx={{
              height: "150px",
            }}
          >
            <TextAreaComponent
              id="userId"
              multiline
              rows={6}
              fullWidth
              placeholder="Type something..."
              sx={{
                height: "100%",
              }}
              onChange={(e) => setContent(e.target.value)}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
  // return <Card {...props}>{children}</Card>;
};

export default AddTextCardComponent;
