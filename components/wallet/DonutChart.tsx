import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import theme from "@chakra-ui/theme";
import { ResponsivePie } from "@nivo/pie";

export const DonutChart = (props: { data: Array<Object> }) => {
  const CenteredMetric = ({ dataWithArc, centerX, centerY }: any) => {
    let total: number = 0;
    dataWithArc.forEach((datum: { value: string }) => {
      total += parseFloat(datum.value);
    });

    return (
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="1.5em"
        fontWeight="600"
      >
        ${total.toLocaleString("en")}
      </text>
    );
  };

  return (
    <Flex
      boxShadow="rgb(218 218 222) 6px 6px 12px, rgb(255 255 255) -6px -6px 12px"
      borderRadius="xl"
      direction="column"
      py="4"
      h='100%'
    >
      <Heading fontSize="xl" px="4">
        Total Wallet Balance
      </Heading>
      <ResponsivePie
        data={props.data || []}
        // fit={true}
        valueFormat=" >-$,.10~r"
        sortByValue={true}
        margin={{ top: 40, right: 80, bottom: 120, left: 80 }}
        innerRadius={0.7}
        padAngle={1}
        cornerRadius={1}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 1.5]] }}
        enableArcLabels={false}
        enableArcLinkLabels={true}
        arcLinkLabelsDiagonalLength={24}
        arcLinkLabelsSkipAngle={5}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        colors={[
          "#70e000",
          "#007200",
          "#008000",
          "#38b000",
          "#70e000",
          "#9ef01a",
        ]}
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
    </Flex>
  );
};
