import React, {
    //forwardRef,
    Fragment,
    memo,
    //type Ref,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

import ReactDOM from 'react-dom';
import invariant from 'tiny-invariant';

//import mergeRefs from '@atlaskit/ds-lib/merge-refs';
//import Heading from '@atlaskit/heading';
// This is the smaller MoreIcon soon to be more easily accessible with the
// ongoing icon project
//import MoreIcon from '@atlaskit/icon/utility/migration/show-more-horizontal--editor-more';
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
import { preserveOffsetOnSource } from '@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { dropTargetForExternal } from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
//import { Box, Grid, Stack, xcss } from '@atlaskit/primitives';
//import { token } from '@atlaskit/tokens';

import { useBoardContext } from './board-context';
import { useColumnContext } from './column-context';
import {ColumnType, Person} from "@/components/dnd/board/data";
import {
    disableNativeDragPreview
} from "@atlaskit/pragmatic-drag-and-drop/element/disable-native-drag-preview";

type State =
    | { type: 'idle' }
    | { type: 'preview'; container: HTMLElement; rect: DOMRect }
    | { type: 'dragging' };

const idleState: State = { type: 'idle' };
const draggingState: State = { type: 'dragging' };

const noMarginStyles = `space-8`;
const baseStyles = `width-full padding-8 background-elevation-surface border-radius-8 position-relative hover:background-elevation-surface-hovered`;
/*const baseStyles = xcss({
    width: '100%',
    padding: 'space.100',
    backgroundColor: 'elevation.surface',
    borderRadius: 'border.radius.200',
    position: 'relative',
    ':hover': {
        backgroundColor: 'elevation.surface.hovered',
    },
});*/

const stateStyles: {
    [Key in State['type']]: string | undefined;
} = {
    idle: `cursor-grab`, /*xcss({
        cursor: 'grab',
        boxShadow: 'elevation.shadow.raised',
    }),*/
    dragging: `opacity-40` /*xcss({
        opacity: 0.4,
        boxShadow: 'elevation.shadow.raised',
    })*/,
    // no shadow for preview - the platform will add it's own drop shadow
    preview: undefined,
};

const buttonColumnStyles = `self-start` /*xcss({
    alignSelf: 'start',
})*/;

/*type CardPrimitiveProps = {
    closestEdge: Edge | null;
    item: Person;
    state: State;
    actionMenuTriggerRef?: Ref<HTMLButtonElement>;
};*/

function MoveToOtherColumnItem({
                                   targetColumn,
                                   startIndex,
                               }: {
    targetColumn: ColumnType;
    startIndex: number;
}) {
    const { moveCard } = useBoardContext();
    const { columnId } = useColumnContext();

    const onClick = useCallback(() => {
        moveCard({
            startColumnId: columnId,
            finishColumnId: targetColumn.columnId,
            itemIndexInStartColumn: startIndex,
        });
    }, [columnId, moveCard, startIndex, targetColumn.columnId]);

    return <div onClick={onClick}>{targetColumn.title}</div>;
}

function LazyDropdownItems({ userId }: { userId: string }) {
    const { getColumns,  } = useBoardContext();
    const { columnId, getCardIndex,  } = useColumnContext();

    //const numCards = getNumCards();
    const startIndex = getCardIndex(userId);

/*    const moveToTop = useCallback(() => {
        reorderCard({ columnId, startIndex, finishIndex: 0 });
    }, [columnId, reorderCard, startIndex]);

    const moveUp = useCallback(() => {
        reorderCard({ columnId, startIndex, finishIndex: startIndex - 1 });
    }, [columnId, reorderCard, startIndex]);

    const moveDown = useCallback(() => {
        reorderCard({ columnId, startIndex, finishIndex: startIndex + 1 });
    }, [columnId, reorderCard, startIndex]);

    const moveToBottom = useCallback(() => {
        reorderCard({ columnId, startIndex, finishIndex: numCards - 1 });
    }, [columnId, reorderCard, startIndex, numCards]);

    const isMoveUpDisabled = startIndex === 0;
    const isMoveDownDisabled = startIndex === numCards - 1;*/

    const moveColumnOptions = getColumns().filter((column) => column.columnId !== columnId);

    return (
        <Fragment>
            <div title="Reorder">
                {/*<DropdownItem onClick={moveToTop} isDisabled={isMoveUpDisabled}>
                    Move to top
                </DropdownItem>
                <DropdownItem onClick={moveUp} isDisabled={isMoveUpDisabled}>
                    Move up
                </DropdownItem>
                <DropdownItem onClick={moveDown} isDisabled={isMoveDownDisabled}>
                    Move down
                </DropdownItem>
                <DropdownItem onClick={moveToBottom} isDisabled={isMoveDownDisabled}>
                    Move to bottom
                </DropdownItem>*/}
            </div>
            {moveColumnOptions.length ? (
                <div title="Move to">
                    {moveColumnOptions.map((column) => (
                        <MoveToOtherColumnItem
                            key={column.columnId}
                            targetColumn={column}
                            startIndex={startIndex}
                        />
                    ))}
                </div>
            ) : null}
        </Fragment>
    );
}

const CardPrimitive = function CardPrimitive(
    { closestEdge, item, state, ref, actionMenuTriggerRef, setSelection, index  }:any
) {
    const { title, userId, subtasks } = item;

    return (
        <>
            <div
                ref={ref}
                id={`item-${userId}`}
                className={`flex ${closestEdge === 'top' ? `flex-col-reverse` : `flex-col`} w-[280px] auto-cols-auto space-1 items-center ${baseStyles} ${stateStyles[state.type as string] as string}`}
            >
                {/*<Avatar size="large" src={avatarUrl}>
                {(props) => (
                    // Note: using `div` rather than `Box`.
                    // `CustomAvatarProps` passes through a `className`
                    // but `Box` does not accept `className` as a prop.
                    <div
                        {...props}
                        // Workaround to make `Avatar` not draggable.
                        // Ideally `Avatar` would have a `draggable` prop.
                        // eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
                        style={{ pointerEvents: 'none' }}
                        ref={props.ref as Ref<HTMLDivElement>}
                    />
                )}
            </Avatar>*/}
                <div onClick={() => setSelection({item: {...item, index}, mode: 'view'})}
                     className={`py-6 px-4 w-full rounded-[8px] bg-white space-1 flex-1`}>
                    <h2 className={`font-bold text-[15px]`}>
                        {title}
                    </h2>
                    <div className={noMarginStyles}>
                        {subtasks?.filter(t => t.isCompleted).length} of {subtasks?.length} subtasks
                    </div>
                </div>


                {closestEdge && <div
                    className={`w-full h-[100px] `}></div>}{/*<DropIndicator edge={closestEdge} gap={token('space.100', '0')} />*/}
            </div>
            {state.type === 'preview' &&
                ReactDOM.createPortal(
                    <div >{item.label}</div>,
                    state.container,
                )}
        </>
    );
};

export const Card = memo(function Card({item, index, setSelection}: {
    index: number,
    item: Person,
    setSelection: any
}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const {userId} = item;
    const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
    const [state, setState] = useState<State>(idleState);

    //const actionMenuTriggerRef = useRef<HTMLButtonElement>(null);
    const {instanceId, registerCard} = useBoardContext();
    useEffect(() => {
        //invariant(actionMenuTriggerRef.current);
        invariant(ref.current);
        return registerCard({
            cardId: userId,
            entry: {
                element: ref.current,
                //actionMenuTrigger: actionMenuTriggerRef.current,
            },
        });
    }, [registerCard, userId]);

    useEffect(() => {
        const element = ref.current;
        invariant(element);
        return combine(
            /*draggable({
                element,
                getInitialData: () => ({type: 'card', itemId: userId, instanceId}),
                onGenerateDragPreview({ nativeSetDragImage }) {
                    disableNativeDragPreview({ nativeSetDragImage });
                },
                onDragStart: () => setState(draggingState),
                onDrop: () => setState(idleState),
            }),*/
            draggable({
                element: element,
                getInitialData: () => ({type: 'card', itemId: userId, instanceId}),
                onGenerateDragPreview: ({location, source, nativeSetDragImage}) => {
                    const rect = source.element.getBoundingClientRect();

                    setCustomNativeDragPreview({
                        nativeSetDragImage,
                        getOffset: preserveOffsetOnSource({
                            element,
                            input: location.current.input,
                        }),
                        render({container}) {
                            setState({type: 'preview', container, rect});
                            return () => setState(draggingState);
                        },
                    });
                },

                onDragStart: () => setState(draggingState),
                onDrop: () => setState(idleState),
            }),
            dropTargetForExternal({
                element: element,
            }),
            dropTargetForElements({
                element: element,
                canDrop: ({ source }) => {
                    return source.data.instanceId === instanceId && source.data.type === 'card';
                },
                getIsSticky: () => true,
                getData: ({ input, element }) => {
                    const data = { type: 'card', itemId: userId };

                    return attachClosestEdge(data, {
                        input,
                        element,
                        allowedEdges: ['top', 'bottom'],
                    });
                },
                onDragEnter: (args) => {
                    if (args.source.data.itemId !== userId) {
                        setClosestEdge(extractClosestEdge(args.self.data));
                    }
                },
                onDrag: (args) => {
                    if (args.source.data.itemId !== userId) {
                        setClosestEdge(extractClosestEdge(args.self.data));
                    }
                },
                onDragLeave: () => {
                    setClosestEdge(null);
                },
                onDrop: () => {
                    setClosestEdge(null);
                },
            }),
        );
    }, [instanceId, item, userId]);

    return (
        <Fragment>
            <CardPrimitive
                setSelection={setSelection}
                ref={ref}
                item={item}
                index={index}
                state={state}
                closestEdge={closestEdge}
                /*actionMenuTriggerRef={actionMenuTriggerRef}*/
            />
            {state.type === 'preview' &&
                ReactDOM.createPortal(
                    <div
                        style={{
                            /**
                             * Ensuring the preview has the same dimensions as the original.
                             *
                             * Using `border-box` sizing here is not necessary in this
                             * specific example, but it is safer to include generally.
                             */
                            boxSizing: 'border-box',
                            width: state.rect.width,
                            height: state.rect.height,
                            rotate: '3deg',
                        }}
                    >
                        <CardPrimitive item={item} state={state} closestEdge={null} />
                    </div>,
                    state.container,
                )}
        </Fragment>
    );
});
