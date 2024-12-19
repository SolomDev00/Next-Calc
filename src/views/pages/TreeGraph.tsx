// import React, { useState } from "react";
// import { select, hierarchy, tree, linkHorizontal, HierarchyNode } from "d3";

// interface TreeData {
  // [key: string]: string[];
// }

const TreeGraph = () => {
  // const [treeData, setTreeData] = useState<TreeData>({
  //   "1": ["2", "3"],
  //   "2": ["4", "5"],
  //   "3": [],
  //   "4": [],
  //   "5": [],
  // });

  // const drawTree = () => {
  //   const svg = select("#tree-svg");
  //   svg.selectAll("*").remove();

  //   const width = 600;
  //   const height = 400;

  //   // Create the root node
  //   const root = hierarchy(treeData, (d) => {
  //     // Transform the children into the expected format
  //     const keys = Object.keys(d);
  //     return keys.map((key) => ({ [key]: d[key] })); // Convert each child into TreeData
  //   });

  //   const treeLayout = tree<HierarchyNode<TreeData>>().size([width - 100, height - 100]);

  //   const links = treeLayout(root).links();
  //   const nodes = root.descendants();

  //   // Draw links
  //   svg.selectAll("path")
  //     .data(links)
  //     .enter()
  //     .append("path")
  //     // .attr(
  //     //   "d",
  //     //   linkHorizontal()
  //     //     .x((d) => d.x)
  //     //     .y((d) => d.y)
  //     // )
  //     .attr("fill", "none")
  //     .attr("stroke", "#888")
  //     .attr("stroke-width", 2);

  //   // Draw nodes
  //   svg.selectAll("circle")
  //     .data(nodes)
  //     .enter()
  //     .append("circle")
  //     .attr("cx", (d) => d.x)
  //     .attr("cy", (d) => d.y)
  //     .attr("r", 15)
  //     .attr("fill", "#6c35de");

  //   // Draw labels
  //   svg.selectAll("text")
  //     .data(nodes)
  //     .enter()
  //     .append("text")
  //     .attr("x", (d) => d.x)
  //     .attr("y", (d) => d.y)
  //     .attr("dy", 5)
  //     .attr("text-anchor", "middle")
  //     .attr("fill", "#fff")
  //     .text((d) => d.data as string);
  // };

  return (
    <div>
      {/* <button onClick={drawTree} className="bg-blue-500 text-white px-4 py-2">
        Draw Tree
      </button> */}
      <svg id="tree-svg" width="600" height="400"></svg>
    </div>
  );
};

export default TreeGraph;
