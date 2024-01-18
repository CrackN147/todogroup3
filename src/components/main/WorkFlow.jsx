import { useEffect, useRef } from 'react';
import { columnsConfig } from 'system/config';
import { Column, ColumnUsers } from 'components';
export const WorkFlow = () => {
  const workflowRef = useRef(null);
  useEffect(() => {
    let divs = document.getElementsByTagName("div");
    for (let i = 0; i < divs.length; i++) {
      if (divs[i].classList.length === 0 && divs[i].id !== "root") {
        divs[i].remove();
      }
    }
  }, []);
  return (
    <div className='workflow' ref={workflowRef}>
      {columnsConfig.map((column) => (
        <Column 
          key={`columns-block-${column.id}`} 
          column={column}
          workflowRef={workflowRef}
        />
      ))}
      <ColumnUsers />
    </div>
  );
}