import { columnsConfig } from 'system/config';
import { Column } from 'components';
export const WorkFlow = () => {
  return (
    <div className='workflow'>
      {columnsConfig.map((column) => (
        <Column 
          key={`columns-block-${column.id}`} 
          column={column}
        />
      ))}
    </div>
  );
}