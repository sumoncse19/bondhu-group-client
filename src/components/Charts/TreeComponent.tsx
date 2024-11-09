import dynamic from "next/dynamic";
import React from "react";

// Dynamically importing react-organizational-chart to prevent SSR issues
const Tree = dynamic(
  () => import("react-organizational-chart").then((mod) => mod.Tree),
  { ssr: false }
);

const TreeNode = dynamic(
  () => import("react-organizational-chart").then((mod) => mod.TreeNode),
  { ssr: false }
);

const TreeComponent: React.FC = () => {
  if (typeof window === "undefined") {
    return null; // Ensure the component is not rendered on the server side
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Tree
        label={
          <div className="text-lg font-bold bg-blue-200 rounded-lg p-2">
            Root
          </div>
        }
      >
        <TreeNode
          label={
            <div className="text-lg bg-green-200 rounded-lg p-2">Child 1</div>
          }
        >
          <TreeNode
            label={
              <div className="text-sm bg-yellow-200 rounded-lg p-2">
                Grandchild 1
              </div>
            }
          />
          <TreeNode
            label={
              <div className="text-sm bg-yellow-200 rounded-lg p-2">
                Grandchild 2
              </div>
            }
          />
        </TreeNode>
        <TreeNode
          label={
            <div className="text-lg bg-green-200 rounded-lg p-2">Child 2</div>
          }
        >
          <TreeNode
            label={
              <div className="text-sm bg-yellow-200 rounded-lg p-2">
                Grandchild 3
              </div>
            }
          />
          <TreeNode
            label={
              <div className="text-sm bg-yellow-200 rounded-lg p-2">
                Grandchild 4
              </div>
            }
          />
        </TreeNode>
      </Tree>
    </div>
  );
};

export default TreeComponent;
