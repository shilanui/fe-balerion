"use client";
import { ROLE_COLOR } from "@/constant/role";
import { Card, CardContent, Typography, Grid, Box, Chip } from "@mui/material";

const CardComponent = ({ isNew, cardId, cardRole, cardContent, ...props }) => {
  return (
    <Card {...props}>
      {isNew && (
        <Chip
          label="NEW"
          color="secondary"
          size="small"
          sx={{
            p: 1,
            fontSize: "10px",
            position: "absolute",
            top: -10,
            right: -10,
          }}
        />
      )}
      <CardContent>
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
            <Box>
              <Typography variant="subtitle2" fontWeight="bold">
                {cardId}
              </Typography>
              <Chip
                label={cardRole}
                color={ROLE_COLOR[cardRole]}
                size="small"
              />
            </Box>
          </Grid>
          <Grid
            size={{ xs: 7.5, sm: 8, md: 9, lg: 8.5 }}
            sx={{
              height: "150px",
              overflowY: "auto",
            }}
          >
            <Typography
              color="text.secondary"
              sx={{
                fontSize: "11px",
              }}
            >
              {cardContent}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
  // return <Card {...props}>{children}</Card>;
};

export default CardComponent;
