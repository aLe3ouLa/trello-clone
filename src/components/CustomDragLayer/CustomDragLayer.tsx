import { useDragLayer, XYCoord } from 'react-dnd';
import { Card } from '../Card/Card';
import { Lane } from '../Column/Lane';
import { DragTypes } from './DragItemTypes';

function getItemStyles(currentOffset: XYCoord | null): React.CSSProperties {
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }
  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export const CustomDragLayer: React.FC = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  return isDragging ? (
    <div className="h-full fixed left-0 pointer-events-none top-0 z-50">
      <div style={getItemStyles(currentOffset)}>
        {item.type === DragTypes.LANE ? (
          <Lane id={item.id} text={item.text} index={item.index} isPreview />
        ) : (
          <Card
            id={item.id}
            text={item.text}
            index={item.index}
            laneId={item.laneId}
            isPreview
          />
        )}
      </div>
    </div>
  ) : null;
};
