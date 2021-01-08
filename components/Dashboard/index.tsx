import Box from "@material-ui/core/Box";
import Item from "./Item";
import { NextPage } from "next";
import { items } from "./config";

const Dashboard: NextPage = () => {
  return (
    <Box display="flex" flexDirection="column">
      {items.map((item, idx) => (
        <Item
          app={item.app}
          url={item.url}
          description={item.description}
          auth={item.auth}
          key={idx}
        />
      ))}
    </Box>
  );
};

export default Dashboard;
