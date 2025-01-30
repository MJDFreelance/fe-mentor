import React, { forwardRef, memo, type ReactNode, useEffect } from 'react';

import { autoScrollWindowForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';

import { useBoardContext } from './board-context';

type BoardProps = {
    children: ReactNode;
};

const boardStyles = `flex justify-center gap-space.200 flex-row height-480px`;
/*const boardStyles = xcss({
    display: 'flex',
    justifyContent: 'center',
    gap: 'space.200',
    flexDirection: 'row',
    height: '480px',
});*/

const Board = forwardRef<HTMLDivElement, BoardProps>(({ children }: BoardProps, ref) => {
    const { instanceId } = useBoardContext();

    useEffect(() => {
        return autoScrollWindowForElements({
            canScroll: ({ source }) => source.data.instanceId === instanceId,
        });
    }, [instanceId]);

    return (
        <div className={boardStyles} ref={ref}>
            {children}
        </div>
    );
});
Board.displayName = 'Board';


export default memo(Board);
