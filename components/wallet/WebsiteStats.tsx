import { Divider, Flex, Heading } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { getDaily, getTotal } from "../../utils/nativeAPI";
import { RankPlacement } from "./RankPlacement";

interface Query {
  token_ticker: string;
  daily_visits?: number;
  total_visits?: number;
}

const WebsiteStats = (props: { wallet?: string }) => {
  const [dailyView, setDailyView] = useState([]);
  const [totalView, setTotalView] = useState([]);

  useEffect(() => {
    getDailyVisits();
    getTotalVisits();
  }, []);

  const getDailyVisits = async () => {
    try {
      let res = await getDaily();
      setDailyView(res);
    } catch (error) {
      setDailyView([]);
    }
  };

  const getTotalVisits = async () => {
    try {
      let res = await getTotal();
      setTotalView(res);
    } catch (error) {
      setTotalView([]);
    }
  };
  return (
    <Flex direction="column">
      <Heading alignSelf="center" size="md" py="4">
        Total coin visits 🚀
      </Heading>
      <Divider />
      {totalView.map((item: Query, index) => {
        return (
          <RankPlacement
            key={item.token_ticker + (index + 1)}
            rank={index + 1}
            tokenTicker={item.token_ticker}
            visits={item.daily_visits || 0}
          />
        );
      })}
      <Divider />

      <Heading alignSelf="center" size="md" py="4">
        Daily coin visits 🔥
      </Heading>
      <Divider />
      {dailyView.map((item: Query, index) => {
        return (
          <RankPlacement
            key={item.token_ticker + (index + 1)}
            rank={index + 1}
            tokenTicker={item.token_ticker}
            visits={item.daily_visits || 0}
          />
        );
      })}
      <Divider />
    </Flex>
  );
};

export default WebsiteStats;
