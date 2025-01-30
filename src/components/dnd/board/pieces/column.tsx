import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { createPortal } from 'react-dom';
import invariant from 'tiny-invariant';

//import { IconButton } from '@atlaskit/button/new';
/*import DropdownMenu, {
    type CustomTriggerProps,
    DropdownItem,
    DropdownItemGroup,
} from '@atlaskit/dropdown-menu';*/
//import mergeRefs from '@atlaskit/ds-lib/merge-refs';
//import Heading from '@atlaskit/heading';
// This is the smaller MoreIcon soon to be more easily accessible with the
// ongoing icon project
//import MoreIcon from '@atlaskit/icon/utility/migration/show-more-horizontal--editor-more';
//import { easeInOut } from '@atlaskit/motion/curves';
//import { mediumDurationMs } from '@atlaskit/motion/durations';
import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';
import {
    attachClosestEdge,
    type Edge,
    extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
//import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
    draggable,
    dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { centerUnderPointer } from '@atlaskit/pragmatic-drag-and-drop/element/center-under-pointer';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
//import { Box, Flex, Inline, Stack, xcss } from '@atlaskit/primitives';
//import { token } from '@atlaskit/tokens';

//import { type ColumnType } from '../../data/people';

import { useBoardContext } from './board-context';
import { Card } from './card';
import { ColumnContext, type ColumnContextProps, useColumnContext } from './column-context';
import {ColumnType} from "@/components/dnd/board/data";

const columnStyles = `width-250px background-elevation.surface.sunken border-radius-border.radius.300 transition-background-var(--medium-duration-ms)-ease-in-out position-relative`;
const stackStyles = `min-height-0 flex-grow-1`;
const scrollContainerStyles = `height-100% overflow-y-auto`;
const cardListStyles = `box-sizing-border-box min-height-100% padding-space.100 gap-space.100`;
const columnHeaderStyles = `padding-inline-start-space.200 padding-inline-end-space.200 padding-block-start-space.100 color-color.text.subtlest user-select-none`;
/*const columnStyles = xcss({
    width: '250px',
    backgroundColor: 'elevation.surface.sunken',
    borderRadius: 'border.radius.300',
    transition: `background ${mediumDurationMs}ms ${easeInOut}`,
    position: 'relative',
    /!**
     * TODO: figure out hover color.
     * There is no `elevation.surface.sunken.hovered` token,
     * so leaving this for now.
     *!/
});

const stackStyles = xcss({
    // allow the container to be shrunk by a parent height
    // https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/#the-minimum-size-gotcha-11
    minHeight: '0',

    // ensure our card list grows to be all the available space
    // so that users can easily drop on en empty list
    flexGrow: 1,
});

const scrollContainerStyles = xcss({
    height: '100%',
    overflowY: 'auto',
});

const cardListStyles = xcss({
    boxSizing: 'border-box',
    minHeight: '100%',
    padding: 'space.100',
    gap: 'space.100',
});

const columnHeaderStyles = xcss({
    paddingInlineStart: 'space.200',
    paddingInlineEnd: 'space.200',
    paddingBlockStart: 'space.100',
    color: 'color.text.subtlest',
    userSelect: 'none',
});*/

/**
 * Note: not making `'is-dragging'` a `State` as it is
 * a _parallel_ state to `'is-column-over'`.
 *
 * Our board allows you to be over the column that is currently dragging
 */
type State =
    | { type: 'idle' }
    | { type: 'is-card-over' }
    | { type: 'is-column-over'; closestEdge: Edge | null }
    | { type: 'generate-safari-column-preview'; container: HTMLElement }
    | { type: 'generate-column-preview' };

// preventing re-renders with stable state objects
const idle: State = { type: 'idle' };
const isCardOver: State = { type: 'is-card-over' };

const stateStyles: {
    [key in State['type']]: string | undefined;
} = {
    idle: `cursor-grab`,
    'is-card-over': `bg-[--hovered]`,
    'is-column-over': undefined,
    'generate-column-preview': `isolation-isolate`,
    'generate-safari-column-preview': undefined,
};

const isDraggingStyles = `opacity-40`;
/*const isDraggingStyles = xcss({
    opacity: 0.4,
});*/

export const Column = memo(function Column({ column, itemMap, setSelection }: { setSelection:any, column: ColumnType, itemMap:any }) {
    const columnId = column.columnId;
    const columnRef = useRef<HTMLDivElement | null>(null);
    const columnInnerRef = useRef<HTMLDivElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const scrollableRef = useRef<HTMLDivElement | null>(null);
    const [state, setState] = useState<State>(idle);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const { instanceId, registerColumn } = useBoardContext();

    useEffect(() => {
        invariant(columnRef.current);
        invariant(columnInnerRef.current);
        invariant(headerRef.current);
        invariant(scrollableRef.current);
        return combine(
            registerColumn({
                columnId,
                entry: {
                    element: columnRef.current,
                },
            }),
            draggable({
                element: columnRef.current,
                dragHandle: headerRef.current,
                getInitialData: () => ({ columnId, type: 'column', instanceId }),
                onGenerateDragPreview: ({ nativeSetDragImage }) => {
                    const isSafari: boolean =
                        navigator.userAgent.includes('AppleWebKit') && !navigator.userAgent.includes('Chrome');

                    if (!isSafari) {
                        setState({ type: 'generate-column-preview' });
                        return;
                    }
                    setCustomNativeDragPreview({
                        getOffset: centerUnderPointer,
                        render: ({ container }) => {
                            setState({
                                type: 'generate-safari-column-preview',
                                container,
                            });
                            return () => setState(idle);
                        },
                        nativeSetDragImage,
                    });
                },
                onDragStart: () => {
                    setIsDragging(true);
                },
                onDrop() {
                    setState(idle);
                    setIsDragging(false);
                },
            }),
            dropTargetForElements({
                element: columnInnerRef.current,
                getData: () => ({ columnId }),
                canDrop: ({ source }) => {
                    return source.data.instanceId === instanceId && source.data.type === 'card';
                },
                getIsSticky: () => true,
                onDragEnter: () => setState(isCardOver),
                onDragLeave: () => setState(idle),
                onDragStart: () => setState(isCardOver),
                onDrop: () => {
                    console.log('dropped');
                    setState(idle)
                },
            }),
            dropTargetForElements({
                element: columnRef.current,
                canDrop: ({ source }) => {
                    return source.data.instanceId === instanceId && source.data.type === 'column';
                },
                getIsSticky: () => true,
                getData: ({ input, element }) => {
                    const data = {
                        columnId,
                    };
                    return attachClosestEdge(data, {
                        input,
                        element,
                        allowedEdges: ['left', 'right'],
                    });
                },
                onDragEnter: (args) => {
                    setState({
                        type: 'is-column-over',
                        closestEdge: extractClosestEdge(args.self.data),
                    });
                },
                onDrag: (args) => {
                    // skip react re-render if edge is not changing
                    setState((current) => {
                        const closestEdge: Edge | null = extractClosestEdge(args.self.data);
                        if (current.type === 'is-column-over' && current.closestEdge === closestEdge) {
                            return current;
                        }
                        return {
                            type: 'is-column-over',
                            closestEdge,
                        };
                    });
                },
                onDragLeave: () => {
                    setState(idle);
                },
                onDrop: () => {
                    setState(idle);
                },
            }),
            autoScrollForElements({
                element: scrollableRef.current,
                canScroll: ({ source }) =>
                    source.data.instanceId === instanceId && source.data.type === 'card',
            }),
        );
    }, [columnId, registerColumn, instanceId]);

    const stableItems = useRef(column.items);
    useEffect(() => {
        stableItems.current = column.items;
    }, [column.items]);

    const getCardIndex = useCallback((userId: string) => {
        return stableItems.current.findIndex((item) => item.userId === userId);
    }, []);

    const getNumCards = useCallback(() => {
        return stableItems.current.length;
    }, []);

    const contextValue: ColumnContextProps = useMemo(() => {
        return { columnId, getCardIndex, getNumCards };
    }, [columnId, getCardIndex, getNumCards]);

    return (
        <ColumnContext.Provider value={contextValue}>
            <div
                id={`column-${columnId}`}
                ref={columnRef}
                className={`flex-col p-4  flex ${columnStyles} ${stateStyles[state.type]}`}
            >
                {/* This element takes up the same visual space as the column.
          We are using a separate element so we can have two drop targets
          that take up the same visual space (one for cards, one for columns)
        */}
                <div className={`${stackStyles} h-full`} ref={columnInnerRef}>
                    <div className={`${stackStyles} ${isDragging ? isDraggingStyles : undefined} flex flex-col gap-8`}>
                        <div
                            className={`${columnHeaderStyles} space-x-1 items-center`}
                            ref={headerRef}
                            id={`column-header-${columnId}`}
                        >
                            <span id={`column-header-title-${columnId}`}>
                                {column.title}
                            </span>
                           {/* <ActionMenu />*/}
                        </div>
                        <div className={scrollContainerStyles} ref={scrollableRef}>
                            <div className={`${cardListStyles} space-x-1 flex flex-col gap-8`}>
                                {column.items.map((item, index) => (
                                    <Card setSelection={setSelection} index={index} item={itemMap[item]} key={index} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {state.type === 'is-column-over' && state.closestEdge && (
                    <div /*edge={state.closestEdge} */ className={`space-2`} />
                )}
            </div>
            {state.type === 'generate-safari-column-preview'
                ? createPortal(<SafariColumnPreview column={column} />, state.container)
                : null}
        </ColumnContext.Provider>
    );
});

export const EmptyColumn = memo(function Column() {
    const columnId = 'new';//column.columnId;
    const columnRef = useRef<HTMLDivElement | null>(null);
    const columnInnerRef = useRef<HTMLDivElement | null>(null);
    //const headerRef = useRef<HTMLDivElement | null>(null);
    const scrollableRef = useRef<HTMLDivElement | null>(null);
    const [state, setState] = useState<State>(idle);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const { instanceId, registerColumn } = useBoardContext();

    useEffect(() => {
        invariant(columnRef.current);
        invariant(columnInnerRef.current);
        //invariant(headerRef.current);
        invariant(scrollableRef.current);
        return combine(
            registerColumn({
                columnId,
                entry: {
                    element: columnRef.current,
                },
            }),
            draggable({
                element: columnRef.current,
                //dragHandle: headerRef.current,
                getInitialData: () => ({ columnId, type: 'column', instanceId }),
                onGenerateDragPreview: ({ nativeSetDragImage }) => {
                    const isSafari: boolean =
                        navigator.userAgent.includes('AppleWebKit') && !navigator.userAgent.includes('Chrome');

                    if (!isSafari) {
                        setState({ type: 'generate-column-preview' });
                        return;
                    }
                    setCustomNativeDragPreview({
                        getOffset: centerUnderPointer,
                        render: ({ container }) => {
                            setState({
                                type: 'generate-safari-column-preview',
                                container,
                            });
                            return () => setState(idle);
                        },
                        nativeSetDragImage,
                    });
                },
                onDragStart: () => {
                    setIsDragging(true);
                },
                onDrop() {
                    setState(idle);
                    setIsDragging(false);
                },
            }),
            dropTargetForElements({
                element: columnInnerRef.current,
                getData: () => ({ columnId }),
                canDrop: ({ source }) => {
                    return source.data.instanceId === instanceId && source.data.type === 'card';
                },
                getIsSticky: () => true,
                onDragEnter: () => setState(isCardOver),
                onDragLeave: () => setState(idle),
                onDragStart: () => setState(isCardOver),
                onDrop: () => setState(idle),
            }),
            dropTargetForElements({
                element: columnRef.current,
                canDrop: ({ source }) => {
                    return source.data.instanceId === instanceId && source.data.type === 'column';
                },
                getIsSticky: () => true,
                getData: ({ input, element }) => {
                    const data = {
                        columnId,
                    };
                    return attachClosestEdge(data, {
                        input,
                        element,
                        allowedEdges: ['left', 'right'],
                    });
                },
                onDragEnter: (args) => {
                    setState({
                        type: 'is-column-over',
                        closestEdge: extractClosestEdge(args.self.data),
                    });
                },
                onDrag: (args) => {
                    // skip react re-render if edge is not changing
                    setState((current) => {
                        const closestEdge: Edge | null = extractClosestEdge(args.self.data);
                        if (current.type === 'is-column-over' && current.closestEdge === closestEdge) {
                            return current;
                        }
                        return {
                            type: 'is-column-over',
                            closestEdge,
                        };
                    });
                },
                onDragLeave: () => {
                    setState(idle);
                },
                onDrop: () => {
                    setState(idle);
                },
            }),
            autoScrollForElements({
                element: scrollableRef.current,
                canScroll: ({ source }) =>
                    source.data.instanceId === instanceId && source.data.type === 'card',
            }),
        );
    }, [columnId, registerColumn, instanceId]);

    const stableItems = useRef([]);
    useEffect(() => {
        stableItems.current = [];
    }, []);

    const getCardIndex = useCallback((userId: string) => {
        return stableItems.current.findIndex((item) => item.userId === userId);
    }, []);

    const getNumCards = useCallback(() => {
        return stableItems.current.length;
    }, []);

    const contextValue: ColumnContextProps = useMemo(() => {
        return { columnId, getCardIndex, getNumCards };
    }, [columnId, getCardIndex, getNumCards]);

    return (
        <ColumnContext.Provider value={contextValue}>
            <div data-state={state.type}
                id={`column-${columnId}`}
                ref={columnRef}
                className={`min-w-[300px] flex-col  p-4 bg-[#E9EFFA] rounded-[8px] 
                 data-[state=is-card-over]:text-white data-[state=is-card-over]:opacity-80 data-[state=is-card-over]:bg-[#635FC7] flex ${columnStyles} ${stateStyles[state.type]}`}
            >
                {/* This element takes up the same visual space as the column.
          We are using a separate element so we can have two drop targets
          that take up the same visual space (one for cards, one for columns)
        */}
                <div className={`${stackStyles} h-full`} ref={columnInnerRef}>
                    <div className={`${stackStyles} ${isDragging ? isDraggingStyles : undefined} flex flex-col gap-8 h-full`}>
                        <div className={`${scrollContainerStyles} h-full flex flex-col items-center justify-center`} ref={scrollableRef}>
                            <div className={`${cardListStyles} space-x-1 flex flex-col gap-8`}>
                                New Column
                            </div>
                        </div>
                    </div>
                </div>
                {state.type === 'is-column-over' && state.closestEdge && (
                    <div /*edge={state.closestEdge} */ className={`space-2`} />
                )}
            </div>
            {/*{state.type === 'generate-safari-column-preview'
                ? createPortal(<SafariColumnPreview column={column} />, state.container)
                : null}*/}
        </ColumnContext.Provider>
    );
});


const safariPreviewStyles = `width-250px background-elevation.surface.sunken border-radius-border.radius padding-space.200`;
/*const safariPreviewStyles = xcss({
    width: '250px',
    backgroundColor: 'elevation.surface.sunken',
    borderRadius: 'border.radius',
    padding: 'space.200',
});*/

function SafariColumnPreview({ column }: { column: ColumnType }) {
    return (
        <div className={`${columnHeaderStyles} ${safariPreviewStyles}`}>
            <span>
                {column.title}
            </span>
        </div>
    );
}

function ActionMenu() {
    return (
        <div /*trigger={DropdownMenuTrigger}*/>
            <ActionMenuItems />
        </div>
    );
}

function ActionMenuItems() {
    const { columnId } = useColumnContext();
    const { getColumns, reorderColumn } = useBoardContext();

    const columns = getColumns();
    const startIndex = columns.findIndex((column) => column.columnId === columnId);

    const moveLeft = useCallback(() => {
        reorderColumn({
            startIndex,
            finishIndex: startIndex - 1,
        });
    }, [reorderColumn, startIndex]);

    const moveRight = useCallback(() => {
        reorderColumn({
            startIndex,
            finishIndex: startIndex + 1,
        });
    }, [reorderColumn, startIndex]);

    const isMoveLeftDisabled = startIndex === 0;
    const isMoveRightDisabled = startIndex === columns.length - 1;

    return (
        <div>
            <button onClick={moveLeft} disabled={isMoveLeftDisabled}>
                Move left
            </button>
            <button onClick={moveRight} disabled={isMoveRightDisabled}>
                Move right
            </button>
        </div>
    );
}

/*function DropdownMenuTrigger({ triggerRef, ...triggerProps }: any) {
    return (
        <div
            ref={triggerRef}
            appearance="subtle"
            label="Actions"
            spacing="compact"
            {...triggerProps}
        >More</div>
    );
}*/
