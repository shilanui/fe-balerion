"use client";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, useCallback, useEffect } from "react";

import TextAreaComponent from "@/components/TextFieldComponent/TextAreaComponent";
import CardComponent from "@/components/Card/CardComponent";
import { ROLE, ROLE_COLOR } from "@/constant/role";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [memoCard, setMemoCard] = useState([]);
  const [adminCardNo, setAdminCardNo] = useState(null);
  const [userCardNo, setUserCardNo] = useState(null);
  const [content, setContent] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);

  const handleAddCard = () => {
    const dupMemoCard = memoCard;

    if (dupMemoCard?.length) {
      dupMemoCard
        .sort((a, b) => b.id - a.id)
        .forEach((data) => {
          data.isNew = false;
        });

      setMemoCard(dupMemoCard);
    }

    const userRole = isAdmin ? ROLE.ADMIN : "MEMO";
    const cardUserNo =
      memoCard?.filter((data) => data?.role.includes(ROLE.USER))?.length || 0;
    const cardAdminNo =
      memoCard?.filter((data) => data?.role.includes(ROLE.ADMIN))?.length || 0;

    setAdminCardNo(cardAdminNo + 1);
    setUserCardNo(cardUserNo + 1);

    const card = {
      id:
        memoCard?.length > 0
          ? `${userRole}-${isAdmin ? cardAdminNo + 1 : cardUserNo + 1}`
          : `${userRole}-1`,
      role: user?.role,
      content,
      isNew: true,
    };

    setMemoCard([card, ...memoCard]);
    setIsAddNew(false);
    localStorage.setItem("memoCardData", JSON.stringify([card, ...memoCard]));
  };

  const getStoreCard = useCallback(() => {
    const memo = JSON.parse(localStorage.getItem("memoCardData"));
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (memo) {
      const cardUserNo =
        memo?.filter((data) => data?.role === ROLE.USER)?.length || 0;
      const cardAdminNo =
        memo?.filter((data) => data?.role === ROLE.ADMIN)?.length || 0;

      let sortMemo = [];

      if (memo?.length) {
        if (userData?.role === ROLE.ADMIN) {
          sortMemo = memo?.sort((a, b) => b.id - a.id);
        } else {
          sortMemo = memo?.sort((a, b) => a.id - b.id);
        }
      }

      setAdminCardNo(cardAdminNo);
      setUserCardNo(cardUserNo);

      setMemoCard(sortMemo);
    }
  }, []);

  const getUserData = useCallback(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData) {
      setUser(userData);
      setIsAdmin(userData?.role === ROLE.ADMIN ? true : false);
    }
  }, []);

  useEffect(() => {
    getUserData();
    getStoreCard();
  }, [getUserData, getStoreCard]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgColor: "black",
        color: "white",
        p: 5,
        bgcolor: "#0a0a0a",
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center" mb={5}>
        <Typography variant="h4" fontWeight="bold">
          Memo Cards
          <Typography variant="h6" component="span" ml={1}>
            ({memoCard?.length || 0}
            {isAddNew && "+1"})
          </Typography>
        </Typography>
      </Box>

      <Grid
        container
        spacing={3}
        justifyContent="start"
        px={{ xs: 0, sm: 0, md: 0, lg: 10 }}
      >
        {memoCard &&
          memoCard?.map((card, index) => {
            const isNotDisplay = !isAdmin && card?.role === ROLE.ADMIN;
            if (!isNotDisplay)
              return (
                <Grid
                  key={index}
                  size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
                  sx={{
                    position: "relative",
                  }}
                >
                  <CardComponent>
                    {card.isNew && (
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
                              {card.id}
                            </Typography>
                            <Chip
                              label={card.role}
                              color={ROLE_COLOR[card.role]}
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
                            {card.content}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </CardComponent>
                </Grid>
              );
          })}

        {/* Add Card */}
        {isAddNew ? (
          <Grid
            size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
            sx={{
              position: "relative",
            }}
          >
            <CardComponent>
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
                        {(user?.role == ROLE.USER
                          ? +userCardNo
                          : +adminCardNo) + 1}
                      </Typography>
                      <Chip
                        label={user && user?.role}
                        color={ROLE_COLOR[user && user?.role]}
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
            </CardComponent>
          </Grid>
        ) : (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
            <Box
              sx={{
                bgcolor: "#d1d5db",
                borderRadius: 2,
                height: "100%",
                width: "100%",
                minHeight: "180px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "gray.600",
                cursor: "pointer",
                transition: "all 0.3s",
                "&:hover": {
                  bgcolor: "#9ca3af",
                },
              }}
              onClick={() => setIsAddNew(true)}
            >
              <IconButton size="large">
                <AddIcon fontSize="inherit" />
              </IconButton>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default HomePage;
