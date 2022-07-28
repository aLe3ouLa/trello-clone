import { useDragLayer, XYCoord } from 'react-dnd';
import { Column } from '../Column/Column';

function getItemStyles(currentOffset: XYCoord | null): React.CSSProperties {
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }
  const { x, y } = currentOffset;
  console.log(x, y);
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
    <div className="h-full fixed left-0 pointer-events-none top-0 z-100">
      <div style={getItemStyles(currentOffset)}>
        <Column id={item.id} text={item.text} index={item.index} isPreview />
      </div>
    </div>
  ) : null;
};
