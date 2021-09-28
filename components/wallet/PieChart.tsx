import { Box, Heading } from "@chakra-ui/layout";
import theme from "@chakra-ui/theme";
import { ResponsivePie } from "@nivo/pie";

export const PieChart = (props: { data: Array<Object> }) => {
  const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
    let total: number = 0;
    dataWithArc.forEach((datum) => {
      total += parseFloat(datum.value);
    });

    return (
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: "1.5em",
          fontWeight: 600,
        }}
      >
        ${total.toFixed(2)}
      </text>
    );
  };

  return (
    <Box
      h="70%"
      boxShadow="rgb(218 218 222) 6px 6px 12px, rgb(255 255 255) -6px -6px 12px"
      borderRadius="xl"
      mx="4"
      p="8"
    >
      <Heading fontSize="xl" px="4">
        Total Wallet Balance
      </Heading>
      <ResponsivePie
        data={props.data || []}
        fit={false}
        valueFormat=" >-$,.10~r"
        sortByValue={true}
        margin={{ top: 40, right: 80, bottom: 120, left: 80 }}
        innerRadius={0.75}
        padAngle={2}
        cornerRadius={2}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 1.5]] }}
        enableArcLabels={false}
        enableArcLinkLabels={true}
        arcLinkLabelsDiagonalLength={24}
        arcLinkLabelsSkipAngle={40}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        colors={{ scheme: "accent" }}
        motionConfig="slow"
        transitionMode="startAngle"
        layers={[
          "arcs",
          "arcLabels",
          "arcLinkLabels",
          "legends",
          CenteredMetric,
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            translateX: 24,
            translateY: 64,
            itemsSpacing: 8,
            itemWidth: 64,
            itemHeight: 12,
            itemTextColor: "#000001",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 16,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
};
