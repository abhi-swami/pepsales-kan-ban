import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Tooltip } from "react-tooltip";
import { moveBlock, updateBlockData } from "../redux/action";
import FilterBar from "./FilterBar";
import BlockPreview from "./BlockPreview";
import TransitionModal from "./TransitionModal";

const SwimLaneUI = ({ config }) => {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [showTransitionModal, setShowTransitionModal] = useState(false);
  const [transitionData, setTransitionData] = useState(null);
  const blocks = useSelector((state) => state.blocks);
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();


  const filteredBlocks = blocks.filter((block) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return block[key].toLowerCase().includes(value.toLowerCase());
    });
  });
  console.log({filteredBlocks,blocks})

  const onDragEnd = (result) => {
    console.log("Drag ended:", result);
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    const sourceStage = config.lanes.find(
      (lane) => lane.id === source.droppableId
    );
    const destStage = config.lanes.find(
      (lane) => lane.id === destination.droppableId
    );

    if (sourceStage.id === destStage.id) {
      return;
    }

    if (!destStage.allowedTransitions.includes(sourceStage.id)) {
      alert("This transition is not allowed!");
      return;
    }

    dispatch(moveBlock(draggableId, destStage.id));

    setTransitionData({
      blockId: draggableId,
      fromStage: sourceStage.id,
      toStage: destStage.id,
    });
    setShowTransitionModal(true);
  };

  const handleBlockClick = (block) => {
    setSelectedBlock(block);
  };

  const handleTransitionSubmit = (data) => {
    dispatch(
      updateBlockData(transitionData.blockId, {
        ...data,
        stage: transitionData.toStage,
      })
    );
    setShowTransitionModal(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <FilterBar />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-1">
          {config.lanes.map((lane) => (
            <Lane
              key={lane.id}
              lane={lane}
              blocks={filteredBlocks}
              onBlockClick={handleBlockClick}
            />
          ))}
        </div>
      </DragDropContext>
      {selectedBlock && (
        <BlockPreview
          block={selectedBlock}
          onClose={() => setSelectedBlock(null)}
        />
      )}
      {showTransitionModal && (
        <TransitionModal
          onSubmit={handleTransitionSubmit}
          onClose={() => setShowTransitionModal(false)}
          fromStage={
            config.lanes.find((l) => l.id === transitionData.fromStage).name
          }
          toStage={
            config.lanes.find((l) => l.id === transitionData.toStage).name
          }
        />
      )}
    </div>
  );
};

const Lane = ({ lane, blocks, onBlockClick }) => {
  const laneBlocks = blocks.filter((block) => block.stage === lane.id);

  return (
    <Droppable droppableId={lane.id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className={`flex-1 ${lane?.bgColor} p-4 border-r min-w-[250px]`}>
          <div>
            {/* {console.log("provided is", provided)} */}
            <h2 className="text-lg font-bold mb-4">{lane.name}</h2>
            {laneBlocks.map((block, index) => (
              <Block
                key={block.id}
                block={block}
                index={index}
                onClick={onBlockClick}
              />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

const Block = ({ block, index, onClick }) => {
  return (
    <Draggable draggableId={block.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onClick(block)}
        >
          <div className="bg-white p-4 mb-4 rounded shadow-md cursor-pointer">
            <h3 className="font-bold">{block.title}</h3>
            <p className="text-sm text-gray-600">{block.description}</p>
            <p className="text-xs text-gray-500">Stage: {block.stage}</p>
            <p className="text-xs text-gray-500">ID: {block.id}</p>
            <Tooltip id={`tooltip-${block.id}`} />
            <span
              data-tooltip-id={`tooltip-${block.id}`}
              data-tooltip-content={`Last updated: ${new Date(
                block.updatedAt
              ).toLocaleString()}`}
              className="text-xs text-blue-500"
            >
              Info
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default SwimLaneUI;
