"use client";

import { Typography, Grid, Box } from "@mui/material";

import { useState, useCallback, useEffect } from "react";
import CardComponent from "@/components/Card/CardComponent";
import { ROLE } from "@/constant/role";
import AddIconComponent from "@/components/AddComponent/AddIconComponent";
import AddTextCardComponent from "@/components/AddComponent/AddTextCardComponent";

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
      if (isAdmin) {
        dupMemoCard
          .sort((a, b) => b.no - a.no)
          .forEach((data) => {
            data.isNew = false;
          });
      } else {
        dupMemoCard
          .sort((a, b) => a.no - b.no)
          .forEach((data) => {
            data.isNew = false;
          });
      }

      setMemoCard(dupMemoCard);
    }

    const userRole = isAdmin ? ROLE.ADMIN : "MEMO";
    const cardUserNo =
      memoCard?.filter((data) => data?.role === ROLE.USER)?.length || 0;
    const cardAdminNo =
      memoCard?.filter((data) => data?.role === ROLE.ADMIN)?.length || 0;

    setAdminCardNo(cardAdminNo + 1);
    setUserCardNo(cardUserNo + 1);

    const card = {
      no: memoCard?.length + 1,
      id:
        memoCard?.length > 0
          ? `${userRole}-${isAdmin ? cardAdminNo + 1 : cardUserNo + 1}`
          : `${userRole}-1`,
      role: user?.role,
      content,
      isNew: true,
    };

    if (isAdmin) {
      setMemoCard([card, ...memoCard]);
    } else {
      setMemoCard([...memoCard, card]);
    }
    setIsAddNew(false);
    localStorage.setItem("memoCardData", JSON.stringify([card, ...memoCard]));
  };

  const countLengthMemo = () => {
    if (isAdmin) {
      return memoCard?.length;
    } else {
      return memoCard?.filter((data) => data?.role === ROLE.USER)?.length;
    }
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
          sortMemo = memo?.sort((a, b) => b.no - a.no);
        } else {
          sortMemo = memo?.sort((a, b) => a.no - b.no);
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
        color: "white",
        p: 5,
        bgcolor: "#0a0a0a",
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center" mb={5}>
        <Typography variant="h4" fontWeight="bold">
          Memo Cards
          <Typography variant="h6" component="span" ml={1}>
            ({countLengthMemo() || 0}
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
                  <CardComponent
                    isNew={card.isNew}
                    cardId={card.id}
                    cardRole={card.role}
                    cardContent={card.content}
                  />
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
            <AddTextCardComponent
              userRole={user?.role}
              userCardNo={userCardNo}
              adminCardNo={adminCardNo}
              setContent={setContent}
              handleAddCard={handleAddCard}
            />
          </Grid>
        ) : (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
            <AddIconComponent onClick={() => setIsAddNew(true)} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default HomePage;
