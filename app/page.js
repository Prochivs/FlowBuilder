/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import bgImg from './bg.png'
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Panel,
  useReactFlow,
  MiniMap,
  Controls,
  Background,
  getConnectedEdges,
} from "reactflow";
import "reactflow/dist/base.css";
import Image from 'next/image'
import "../tailwind.config.js";
import Sidebar from "./component/sidebar";
import TextNode from "./component/TextNode";
import SideNav from "./component/SideNav";
import LiveChat from "./LiveChat";

// Key for local storage
const flowKey = "flow-key";

// Initial node setup
const initialNodes = [
  {
    id: "node_0",
    type: "textnode",
    data: { label: "Get Started", description:"greet the customer", },
    position: { x: 250, y: 5 },
  },
];

let id = 1;

// Function for generating unique IDs for nodes
const getId = () => `node_${id++}`;


const App = () => {
  
  // Define custom node types
  const nodeTypes = useMemo(
    () => ({
      textnode: TextNode,
    }),
    []
  );

  // States and hooks setup
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedElements, setSelectedElements] = useState([]);
  const [nodeName, setNodeName] = useState("");
  const [nodeDescription, setNodeDescription] = useState("");
  // Update nodes data when nodeName or selectedElements changes
  useEffect(() => {
    if (selectedElements.length > 0) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedElements[0]?.id) {
            return { ...node, data: { ...node.data, label: nodeName,description:nodeDescription } };
          }
          return node;
        })
      );
    } else {
      setNodeDescription(""); // Clear nodeName when no node is selected
    }
  }, [nodeName, selectedElements,nodeDescription, setNodes]);

  // Handle node click
  const onNodeClick = useCallback((event, node) => {
    setSelectedElements([node]);
    setNodeName(node.data.label);
    setNodes((nodes) =>
      nodes.map((n) => ({
        ...n,
        selected: n.id === node.id,
      }))
    );
  }, []);

  // Setup viewport
  const { setViewport } = useReactFlow();

  // Check for empty target handles
  const checkEmptyTargetHandles = () => {
    return edges.filter((edge) => !edge.targetHandle).length;
  };

  // Check if any node is unconnected
  const isNodeUnconnected = useCallback(() => {
    return nodes.some(
      (node) =>
        !edges.some((edge) => edge.source === node.id || edge.target === node.id)
    );
  }, [nodes, edges]);

  // Save flow to local storage
  // const onSave = useCallback(() => {
  //   if (reactFlowInstance) {
  //     const emptyTargetHandles = checkEmptyTargetHandles();

  //     if (nodes.length > 1 && (emptyTargetHandles > 1 || isNodeUnconnected())) {
  //       alert(
  //         "Error: More than one node has an empty target handle or there are unconnected nodes."
  //       );
  //     } else {
  //       const flow = reactFlowInstance.toObject();
  //       localStorage.setItem(flowKey, JSON.stringify(flow));
  //       alert("Save successful!"); // Provide feedback when save is successful
  //       console.log("/////////////////////////////////");
  //       console.log(nodes);
  //       console.log(getConnectedEdges);
  //       console.log("/////////////////////////////////");
  //     }
  //   }
  // }, [reactFlowInstance, nodes, isNodeUnconnected]);



  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const emptyTargetHandles = checkEmptyTargetHandles();
  
      if (nodes.length > 1 && (emptyTargetHandles > 1 || isNodeUnconnected())) {
        alert(
          "Error: More than one node has an empty target handle or there are unconnected nodes."
        );
      } else {
        const flow = reactFlowInstance.toObject();
  
        // Prepare JSON structure
        const flowJson = {
          nodes: flow.nodes.map(node => ({
            id: node.id,
            data: node.data
          })),
          // edges: flow.edges.map(edge => ({
          //   id: edge.id,
          //   source: edge.source,
          //   target: edge.target,
          //   sourceHandle: edge.sourceHandle,
          //   targetHandle: edge.targetHandle
          // })),
          // viewport: flow.viewport
        };
  
        // Store JSON to local storage
        localStorage.setItem(flowKey, JSON.stringify(flowJson));
        console.log(JSON.stringify(flowJson))
        const jsonString = JSON.stringify(JSON.stringify(flowJson));
        axios.post("https://7bee-31-169-100-6.ngrok-free.app/system_prompt",{"prompt":`${jsonString}`}).then((res)=>{
          console.log(res.data)
          alert("Flow has been created successfully")
        }).catch((e)=>{console.log(e)});
       
       
      }
    }
  }, [reactFlowInstance, nodes, isNodeUnconnected]);
  











  // Restore flow from local storage
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  // Handle edge connection
  const onConnect = useCallback(
    (params) => {
      console.log("Edge created: ", params);
      setEdges((eds) => {
        const newEdges = addEdge(params, eds);

        // Update nodes with target names in source node
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === params.source) {
              const existingTargets = node.data.targets || [];
              return {
                ...node,
                data: {
                  ...node.data,
                  targets: [...existingTargets, params.target],
                },
              };
            }
            return node;
          })
        );

        // Update nodes with source names in target node
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === params.target) {
              const existingSources = node.data.sources || [];
              return {
                ...node,
                data: {
                  ...node.data,
                  sources: [...existingSources, params.source],
                },
              };
            }
            return node;
          })
        );

        return newEdges;
      });
    },
    [setEdges, setNodes]
  );

  // Enable drop effect on drag over
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Handle drop event to add a new node
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const nodeName_ = event.dataTransfer.getData("name");


      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const node_id = getId()
      const newNode = {
        id: node_id,
        type,
        position,
        data: { 
          id:node_id,
          label: `${nodeName_}`, 
          description: "",
          ...(nodeName_.toLocaleLowerCase() === 'email' && { to: '', subject: '', html: '', text: '', from: '' }),
          ...(nodeName_.toLocaleLowerCase() === 'sms' && { to: '', from: '', message: '' }),
          ...(nodeName_.toLocaleLowerCase() === 'call' && { to: '', from: '' }),
          ...(nodeName_.toLocaleLowerCase() === 'whatsapp message' && { to: '', from: '', message: '' }),
          ...(nodeName_.toLocaleLowerCase() === 'file' && {  name: '', file: '' }),
          ...(nodeName_.toLocaleLowerCase() === 'book appointments' && { name: '', date: '', place: '' }),

        },
      };

      console.log("Node created: ", newNode);
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const rfStyle = {
   background:"transparent",
   zindex:50,
  };

  return (
    <div  className="flex flex-row min-h-screen relative lg:flex-row">
      <Image src={bgImg} className="absolute object-fit h-screen w-full z-1"/>
      
      <SideNav/>
       {/* <Sidebar
        nodeName={nodeName}
        setNodeName={setNodeName}
        setNodeDescription={setNodeDescription}
        nodeDescription={nodeDescription}
        selectedNode={selectedElements[0]}
        setSelectedElements={setSelectedElements}
        onSave={onSave}
      /> */}

{/* <>

</> */}


     <div className="flex-grow h-screen" ref={reactFlowWrapper}>
      <LiveChat/>
      </div>
     
     
    </div>
  );
};

// Wrap App with ReactFlowProvider
function FlowWithProvider() {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
}

export default FlowWithProvider;
