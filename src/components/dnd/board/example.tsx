import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import invariant from 'tiny-invariant';

//import { triggerPostMoveFlash } from '@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash';
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types';
import { getReorderDestinationIndex } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index';
import * as liveRegion from '@atlaskit/pragmatic-drag-and-drop-live-region';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder';
import {ColumnMap, ColumnType /*getBasicData*/, Person} from "@/components/dnd/board/data";
import {BoardContextValue, BoardContext} from "@/components/dnd/board/pieces/board-context";
import {createRegistry} from "@/components/dnd/board/pieces/registry";
import Board from "@/components/dnd/board/pieces/board";
import {Column, EmptyColumn} from "@/components/dnd/board/pieces/column";
import data from "@/components/dnd/board/data.json";
import {v4 as uuid} from 'uuid';
import crypto from 'crypto';
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {TaskEdit} from "@/components/dnd/board/pieces/task-edit";
import {TaskView} from "@/components/dnd/board/pieces/task-view";
import {TaskAdd} from "@/components/dnd/board/pieces/task-add";
import {BoardAdd} from "@/components/dnd/board/pieces/board-add";
import {BoardEdit} from "@/components/dnd/board/pieces/board-edit";
import {MoveNew} from "@/components/dnd/board/pieces/move-new";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader, SidebarProvider,
    SidebarTrigger
} from "@/components/ui/sidebar";
import {CustomSidebarTrigger} from "@/components/dnd/board/CustomSidebarTrigger";
import {Switch} from "@/components/ui/switch";

//import { type ColumnMap, type ColumnType, getBasicData, type Person } from './pragmatic-drag-and-drop/documentation/examples/data/people';
//import Board from './pragmatic-drag-and-drop/documentation/examples/pieces/board/board';
//import { BoardContext, type BoardContextValue } from './pragmatic-drag-and-drop/documentation/examples/pieces/board/board-context';
//import { Column } from './pragmatic-drag-and-drop/documentation/examples/pieces/board/column';
//import { createRegistry } from './pragmatic-drag-and-drop/documentation/examples/pieces/board/registry';

type Outcome =
    | {
    type: 'column-reorder';
    columnId: string;
    startIndex: number;
    finishIndex: number;
}
    | {
    type: 'card-reorder';
    columnId: string;
    startIndex: number;
    finishIndex: number;
}
    | {
    type: 'card-move';
    finishColumnId: string;
    itemIndexInStartColumn: number;
    itemIndexInFinishColumn: number;
};

type Trigger = 'pointer' | 'keyboard';

type Operation = {
    trigger: Trigger;
    outcome: Outcome;
};

type BoardsState = {
    allBoards:any,
    currentBoard:string,
    columnMaps: Record<string, ColumnMap>;
    orderedColumnIds: Record<string, string[]>;
    lastOperation: Operation | null;
};

/*type BoardState = {
    columnMap: ColumnMap;
    orderedColumnIds: string[];
    lastOperation: Operation | null;
};*/

const generateDeterministicId = (input) => {
    // Generate a deterministic hash based on input
    return crypto.createHash('sha256').update(input).digest('hex').slice(0, 8); // Shortened for readability
};

const getJSONData = () => {
    const taskMap = {} as any;
    const formattedData =  {
        allBoards:data,
        columnMaps: data.boards.reduce((acc, board) => {
            const boardId = board.id || generateDeterministicId(board.name);
            acc[boardId] = board.columns.reduce((acc, column) => {
                const columnId = column.id || generateDeterministicId(column.name);
                acc[columnId] = {
                    title: column.name,
                    columnId,
                    items: column.tasks.map(task=>{
                        const formattedTask = { ...task, status:columnId, userId: task.id || generateDeterministicId(task.title) };
                        taskMap[formattedTask.userId] = formattedTask;
                        return formattedTask.userId
                    }),
                };
                return acc;
            }, {} as any);
            return acc;
        }, {} as any),
        boardNames: data.boards.reduce((acc, board) => {
            acc[generateDeterministicId(board.name)] = board.name;
            return acc;
        }, {} as any),
        lastOperation: null,
    } as any;
    formattedData.currentBoard = Object.keys(formattedData.columnMaps)[0];
    formattedData.orderedColumnIds = Object.keys(formattedData.columnMaps).reduce((acc, boardId) => {
        acc[boardId] = Object.keys(formattedData.columnMaps[boardId]);
        return acc;
    }, {} as any);
    formattedData.taskMap = taskMap;
    console.log(formattedData);
    return formattedData;
}

export default function BoardExample() {
    const loadBoardsData:()=>BoardsState = () => {
        return getJSONData();
    }

    const [data, setData] = useState<BoardsState>(() => {
        const base = loadBoardsData();
        return {
            ...base,
            lastOperation: null,
        };
    });

    const [selection, setSelection] = useState<{item:any|undefined, mode:`view`|`add`|`edit`|'delete'}|null>(null);
    const [boardSelection, setBoardSelection] = useState<{board:any|undefined, mode:`view`|`add`|`edit`|'delete'}|null>(null);

    const stableData = useRef(data);
    useEffect(() => {
        stableData.current = data;
    }, [data]);

    const [registry] = useState(createRegistry);

    const { lastOperation } = data;

    useEffect(() => {
        if (lastOperation === null) {
            return;
        }
        const { outcome, trigger } = lastOperation;

        if (outcome.type === 'column-reorder') {
            const { startIndex, finishIndex } = outcome;

            const { columnMaps, orderedColumnIds, currentBoard } = stableData.current;
            const sourceColumn = columnMaps[currentBoard][orderedColumnIds[currentBoard][finishIndex]];

            //const entry = registry.getColumn(sourceColumn.columnId);
            //triggerPostMoveFlash(entry.element);

            liveRegion.announce(
                `You've moved ${sourceColumn.title} from position ${
                    startIndex + 1
                } to position ${finishIndex + 1} of ${orderedColumnIds.length}.`,
            );

            return;
        }

        if (outcome.type === 'card-reorder') {
            const { columnId, startIndex, finishIndex } = outcome;

            const { columnMaps, currentBoard } = stableData.current;
            const column = columnMaps[currentBoard][columnId];
            const item = column.items[finishIndex];

            //const entry = registry.getCard(item.userId);
            //triggerPostMoveFlash(entry.element);

            if (trigger !== 'keyboard') {
                return;
            }

            liveRegion.announce(
                `You've moved ${item.name} from position ${
                    startIndex + 1
                } to position ${finishIndex + 1} of ${column.items.length} in the ${column.title} column.`,
            );

            return;
        }

        if (outcome.type === 'card-move') {
            const { finishColumnId, itemIndexInStartColumn, itemIndexInFinishColumn } = outcome;

            const data = stableData.current;
            const destinationColumn = data.columnMaps[data.currentBoard][finishColumnId];
            const item = destinationColumn.items[itemIndexInFinishColumn];

            const finishPosition =
                typeof itemIndexInFinishColumn === 'number'
                    ? itemIndexInFinishColumn + 1
                    : destinationColumn.items.length;

            const entry = registry.getCard(item);
            //triggerPostMoveFlash(entry.element);

            if (trigger !== 'keyboard') {
                return;
            }

            liveRegion.announce(
                `You've moved ${item.name} from position ${
                    itemIndexInStartColumn + 1
                } to position ${finishPosition} in the ${destinationColumn.title} column.`,
            );

            /**
             * Because the card has moved column, it will have remounted.
             * This means we need to manually restore focus to it.
             */
            entry.actionMenuTrigger.focus();

            return;
        }
    }, [lastOperation, registry]);

    useEffect(() => {
        return liveRegion.cleanup();
    }, []);

    const getColumns = useCallback(() => {
        const { columnMaps, orderedColumnIds } = stableData.current;
        return orderedColumnIds[data.currentBoard]?.map((columnId) => columnMaps[data.currentBoard][columnId])??[];
    }, []);

    const deleteBoard = useCallback(
        ({
             boardId,
             trigger = 'keyboard'
            }: {
            boardId: string;
            trigger?: 'pointer' | 'keyboard'
        }) => {
            setData((data) => {
                const board = data.allBoards.boards.find(board => board.id === boardId);
                const columnMap = {...data.columnMaps};
                delete columnMap[boardId];
                const orderedColumnIds = {...data.orderedColumnIds};
                delete orderedColumnIds[boardId];
                const allBoards = {boards:data.allBoards.boards.filter(board => board.id !== boardId)};
                const outcome: Outcome | null = {
                    type: 'board-delete',
                    columnId: boardId,
                };

                const boardNames = {...data.boardNames};
                delete boardNames[boardId];

                console.log('new data', {
                    ...data,
                    currentBoard: data.currentBoard === boardId ? Object.keys(data.boardNames).filter(key=>key!==boardId)[0] : data.currentBoard,
                    allBoards,
                    boardNames,
                    columnMaps: columnMap,
                    orderedColumnIds,
                    lastOperation: {
                        trigger,
                        outcome,
                    },
                });

                return {
                    ...data,
                    currentBoard: data.currentBoard === boardId ? Object.keys(data.boardNames).filter(key=>key!==boardId)[0] : data.currentBoard,
                    allBoards,
                    boardNames,
                    columnMaps: columnMap,
                    orderedColumnIds,
                    lastOperation: {
                        trigger,
                        outcome,
                    },
                };
            });
        },
        [],
    );

    const addBoard = useCallback(
        ({
             board,
             trigger = 'keyboard'
            }: {
            board:any,
            trigger?: 'pointer' | 'keyboard'
        }) => {
            setData((data) => {
                const newBoard = {
                    id: data.currentBoard??uuid(),
                    name: board.name,
                    columns: board.columns,
                };

                console.log('newBoard', newBoard);

                const newColumnMap = board.columns?.length>0 ?board.columns.reduce((acc, column) => {
                    const columnId = column.columnId || generateDeterministicId(column.title);
                    acc[columnId] = {
                        title: column.title,
                        columnId,
                        items: column.items??[],
                    };
                    return acc;
                }, {}):{}

                console.log('newColumnMap', newColumnMap);

                const columnMap = {
                    ...data.columnMaps,
                    [newBoard.id]: newColumnMap
                };
                console.log('columnMap', columnMap);
                const orderedColumnIds = {
                    ...data.orderedColumnIds,
                    [newBoard.id]: board.columns.map((column) => column.columnId || generateDeterministicId(column.name)),
                };
                const allBoards = {boards:[...data.allBoards.boards, newBoard]};
                const outcome: Outcome | null = {
                    type: 'board-add',
                    finishColumnId: undefined,
                    itemIndexInStartColumn:undefined,
                    itemIndexInFinishColumn: undefined,
                };

                console.log('saving', {
                    ...data,
                    allBoards,
                    columnMaps: columnMap,
                    orderedColumnIds,
                    currentBoard: newBoard.id,
                    lastOperation: {
                        trigger,
                        outcome,
                    },
                });

                return {
                    ...data,
                    allBoards,
                    columnMaps: columnMap,
                    orderedColumnIds,
                    currentBoard: newBoard.id,
                    lastOperation: {
                        trigger,
                        outcome,
                    },
                };
            });
        },
        [],
    );

    const reorderColumn = useCallback(
        ({
             startIndex,
             finishIndex,
             trigger = 'keyboard',
         }: {
            startIndex: number;
            finishIndex: number;
            trigger?: Trigger;
        }) => {
            setData((data) => {
                const outcome: Outcome = {
                    type: 'column-reorder',
                    columnId: data.orderedColumnIds[data.currentBoard][startIndex],
                    startIndex,
                    finishIndex,
                };

                return {
                    ...data,
                    orderedColumnIds: {...data.orderedColumnIds, [data.currentBoard]: reorder({list: data.orderedColumnIds[data.currentBoard], startIndex, finishIndex})},
                    lastOperation: {
                        outcome,
                        trigger: trigger,
                    },
                };
            });
        },
        [],
    );

    const addCard = useCallback(
        ({
             card,
             itemIndexInFinishColumn,
             trigger = 'keyboard'
            }: {
            card:any,
            itemIndexInFinishColumn?: number;
            trigger?: 'pointer' | 'keyboard'
        }) => {
            setData((data) => {
                const destinationColumn = data.columnMaps[data.currentBoard][card.status];
                console.log('destinationColumn', data.columnMaps[data.currentBoard][card.status]);
                const destinationItems = Array.from(destinationColumn.items);
                // Going into the first position if no index is provided
                const newIndexInDestination = itemIndexInFinishColumn ?? 0;
                destinationItems.splice(newIndexInDestination, 0, card.userId);
                const updatedMap = {
                    ...data.columnMaps[data.currentBoard],
                    [card.status]: {
                        ...destinationColumn,
                        items: destinationItems,
                    },
                };
                const outcome: Outcome | null = {
                    type: 'card-add',
                    finishColumnId: card.status,
                    itemIndexInStartColumn:undefined,
                    itemIndexInFinishColumn: newIndexInDestination,
                };
                console.log({
                    ...data,
                    columnMaps: {...data.columnMaps, [data.currentBoard]: updatedMap},
                    lastOperation: {
                        outcome,
                        trigger: trigger,
                    },
                });
                const taskMap = {...data.taskMap, [card.userId]: {...card, status:card.status}};
                console.log('taskMap', taskMap);
                console.log('columnMaps', {...data.columnMaps, [data.currentBoard]: updatedMap});
                return {
                    ...data,
                    columnMaps: {...data.columnMaps, [data.currentBoard]: updatedMap},
                    taskMap,
                    lastOperation: {
                        outcome,
                        trigger: trigger,
                    },
                };
            });
        },
        [],
    );

    const reorderCard = useCallback(
        ({
             columnId,
             startIndex,
             finishIndex,
             trigger = 'keyboard',
         }: {
            columnId: string;
            startIndex: number;
            finishIndex: number;
            trigger?: Trigger;
        }) => {
            setData((data) => {
                const sourceColumn = data.columnMaps[data.currentBoard][columnId];
                const updatedItems = reorder({
                    list: sourceColumn.items,
                    startIndex,
                    finishIndex,
                });

                const updatedSourceColumn: ColumnType = {
                    ...sourceColumn,
                    items: updatedItems,
                };

                const updatedMap: ColumnMap = {
                    ...data.columnMaps[data.currentBoard],
                    [columnId]: updatedSourceColumn,
                };

                const outcome: Outcome | null = {
                    type: 'card-reorder',
                    columnId,
                    startIndex,
                    finishIndex,
                };

                return {
                    ...data,
                    columnMaps: {...data.columnMaps, [data.currentBoard]: updatedMap},
                    lastOperation: {
                        trigger: trigger,
                        outcome,
                    },
                };
            });
        },
        [],
    );

    const deleteCard = useCallback(
        ({
             columnId,
             itemId,
             trigger = 'keyboard'
            }: {
            columnId: string;
            itemId: number;
            trigger?: Trigger;
        }) => {
            setData((data) => {
                console.log('columnId', columnId);
                const sourceColumn = data.columnMaps[data.currentBoard][columnId];
                const updatedItems = sourceColumn.items.filter((item, index) => item !== itemId);

                const updatedSourceColumn: ColumnType = {
                    ...sourceColumn,
                    items: updatedItems,
                };

                const updatedMap: ColumnMap = {
                    ...data.columnMaps[data.currentBoard],
                    [columnId]: updatedSourceColumn,
                };

                const taskMap = {...data.taskMap};
                delete taskMap[itemId];

                const outcome: Outcome | null = {
                    type: 'card-delete',
                    columnId,
                    itemId,
                };

                return {
                    ...data,
                    columnMaps: {...data.columnMaps, [data.currentBoard]: updatedMap},
                    taskMap,
                    lastOperation: {
                        trigger: trigger,
                        outcome,
                    },
                };
            });
        },
        [],
    );

    const moveCard = useCallback(
        ({
            providedItem,
             newFinishColumnName,
             startColumnId,
             finishColumnId,
             itemIndexInStartColumn,
             itemIndexInFinishColumn,
             trigger = 'keyboard',
         }: {
            providedItem?:any,
            newFinishColumnName?: string;
            startColumnId: string;
            finishColumnId: string;
            itemIndexInStartColumn: number;
            itemIndexInFinishColumn?: number;
            trigger?: 'pointer' | 'keyboard';
        }) => {
            // invalid cross column movement
            console.log('moving card');
            if (startColumnId === finishColumnId) {
                if (providedItem) {
                    setData((data) => {
                        console.log('new data', {
                            ...data,
                            taskMap:{...data.taskMap, [providedItem.userId]: providedItem},
                        });
                        return {
                            ...data,
                            taskMap:{...data.taskMap, [providedItem.userId]: providedItem},
                        };
                    });
                }
                console.log('returning', startColumnId === finishColumnId, providedItem);
                return;
            }
            console.log({startColumnId,
                finishColumnId,
                itemIndexInStartColumn,
                itemIndexInFinishColumn,
                trigger});
            setData((data) => {
                const sourceColumn = data.columnMaps[data.currentBoard][startColumnId];
                const destinationColumn = newFinishColumnName?{columnId:finishColumnId, items:[], title:newFinishColumnName}:data.columnMaps[data.currentBoard][finishColumnId];
                const item: Person = sourceColumn.items[itemIndexInStartColumn];

                const orderedColumnIds = data.orderedColumnIds;
                if (!orderedColumnIds[data.currentBoard].includes(finishColumnId)) {
                    orderedColumnIds[data.currentBoard].push(finishColumnId);
                }

                const destinationItems = Array.from(destinationColumn?.items??[]);
                // Going into the first position if no index is provided
                const newIndexInDestination = itemIndexInFinishColumn ?? 0;
                if(item) destinationItems.splice(newIndexInDestination, 0, item);

                const updatedMap = {
                    ...data.columnMaps[data.currentBoard],
                    [startColumnId]: {
                        ...sourceColumn,
                        items: sourceColumn.items.filter((i) => i !== item),
                    },
                    [finishColumnId]: {
                        ...destinationColumn,
                        items: destinationItems,
                    },
                };

                const outcome: Outcome | null = {
                    type: 'card-move',
                    finishColumnId,
                    itemIndexInStartColumn,
                    itemIndexInFinishColumn: newIndexInDestination,
                };
                console.log({
                    ...data,
                    columnMaps: {...data.columnMaps, [data.currentBoard]: updatedMap},
                    lastOperation: {
                        outcome,
                        trigger: trigger,
                    },
                });

                let taskMap;
                if (providedItem) {
                    taskMap = {...data.taskMap, [providedItem.userId]: {...providedItem, status:finishColumnId}};
                }
                else {
                    console.log('id', item);
                    console.log('item', data.taskMap[item]);
                    console.log('updated item',  {...data.taskMap[item], status:finishColumnId});
                    taskMap = {...data.taskMap, [item]: {...data.taskMap[item], status:finishColumnId}};
                }

                return {
                    ...data,
                    columnMaps: {...data.columnMaps, [data.currentBoard]: updatedMap},
                    taskMap,
                    orderedColumnIds,
                    lastOperation: {
                        outcome,
                        trigger: trigger,
                    },
                };
            });
        },
        [],
    );

    const [instanceId] = useState(() => Symbol('instance-id'));

    useEffect(() => {
        return combine(
            monitorForElements({
                canMonitor({ source }) {
                    return source.data.instanceId === instanceId;
                },
                onDrop(args) {
                    const { location, source } = args;
                    // didn't drop on anything
                    if (!location.current.dropTargets.length) {
                        return;
                    }
                    // need to handle drop

                    // 1. remove element from original position
                    // 2. move to new position

                    if (source.data.type === 'column') {
                        const startIndex: number = data.orderedColumnIds[data.currentBoard].findIndex(
                            (columnId) => columnId === source.data.columnId,
                        );

                        const target = location.current.dropTargets[0];
                        const indexOfTarget: number = data.orderedColumnIds[data.currentBoard].findIndex(
                            (id) => id === target.data.columnId,
                        );
                        const closestEdgeOfTarget: Edge | null = extractClosestEdge(target.data);

                        const finishIndex = getReorderDestinationIndex({
                            startIndex,
                            indexOfTarget,
                            closestEdgeOfTarget,
                            axis: 'horizontal',
                        });

                        reorderColumn({ startIndex, finishIndex, trigger: 'pointer' });
                    }
                    // Dragging a card
                    if (source.data.type === 'card') {
                        console.log('source', source.data);
                        const itemId = source.data.itemId;
                        invariant(typeof itemId === 'string');
                        // TODO: these lines not needed if item has columnId on it
                        const [, startColumnRecord] = location.initial.dropTargets;
                        const sourceId = startColumnRecord.data.columnId;
                        invariant(typeof sourceId === 'string');
                        const sourceColumn = data.columnMaps[data.currentBoard][sourceId];
                        const itemIndex = sourceColumn.items.findIndex((item) => item === itemId);

                        if (location.current.dropTargets.length === 1) {
                            // dropping in a column (relative to the column)
                            const [destinationColumnRecord] = location.current.dropTargets;
                            const destinationId = destinationColumnRecord.data.columnId;
                            invariant(typeof destinationId === 'string');

                            if (destinationId === 'new') return setSelection({item: {...data.taskMap[itemId], index:itemIndex}, mode: 'move-new'});

                            const destinationColumn = data.columnMaps[data.currentBoard][destinationId];
                            invariant(destinationColumn);

                            // reordering in same column
                            if (sourceColumn === destinationColumn) {
                                const destinationIndex = getReorderDestinationIndex({
                                    startIndex: itemIndex,
                                    indexOfTarget: sourceColumn.items.length - 1,
                                    closestEdgeOfTarget: null,
                                    axis: 'vertical',
                                });
                                reorderCard({
                                    columnId: sourceColumn.columnId,
                                    startIndex: itemIndex,
                                    finishIndex: destinationIndex,
                                    trigger: 'pointer',
                                });
                                return;
                            }

                            // moving to a new column
                            moveCard({
                                itemIndexInStartColumn: itemIndex,
                                startColumnId: sourceColumn.columnId,
                                finishColumnId: destinationColumn.columnId,
                                trigger: 'pointer',
                            });
                            return;
                        }

                        // dropping in a column (relative to a card)
                        if (location.current.dropTargets.length === 2) {
                            const [destinationCardRecord, destinationColumnRecord] = location.current.dropTargets;
                            const destinationColumnId = destinationColumnRecord.data.columnId;
                            invariant(typeof destinationColumnId === 'string');
                            const destinationColumn = data.columnMaps[data.currentBoard][destinationColumnId];

                            const indexOfTarget = destinationColumn.items.findIndex(
                                (item) => item === destinationCardRecord.data.itemId,
                            );
                            const closestEdgeOfTarget: Edge | null = extractClosestEdge(
                                destinationCardRecord.data,
                            );
                            // case 1: ordering in the same column
                            if (sourceColumn === destinationColumn) {
                                const destinationIndex = getReorderDestinationIndex({
                                    startIndex: itemIndex,
                                    indexOfTarget,
                                    closestEdgeOfTarget,
                                    axis: 'vertical',
                                });
                                console.log({
                                    columnId: sourceColumn.columnId,
                                    startIndex: itemIndex,
                                    finishIndex: destinationIndex,
                                    trigger: 'pointer',
                                    sourceColumn,
                                    destinationColumn,
                                });
                                reorderCard({
                                    columnId: sourceColumn.columnId,
                                    startIndex: itemIndex,
                                    finishIndex: destinationIndex,
                                    trigger: 'pointer',
                                });
                                return;
                            }

                            // case 2: moving into a new column relative to a card
                            const destinationIndex =
                                closestEdgeOfTarget === 'bottom' ? indexOfTarget + 1 : indexOfTarget;

                            moveCard({
                                itemIndexInStartColumn: itemIndex,
                                startColumnId: sourceColumn.columnId,
                                finishColumnId: destinationColumn.columnId,
                                itemIndexInFinishColumn: destinationIndex,
                                trigger: 'pointer',
                            });
                        }
                    }
                },
            }),
        );
    }, [data, instanceId, moveCard, reorderCard, reorderColumn]);

    const contextValue: BoardContextValue = useMemo(() => {
        return {
            getColumns,
            reorderColumn,
            reorderCard,
            moveCard,
            registerCard: registry.registerCard,
            registerColumn: registry.registerColumn,
            instanceId,
        };
    }, [getColumns, reorderColumn, reorderCard, registry, moveCard, instanceId]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (

            <main className={`w-full z-10`} >
                <section className={`bg-[#F4F7FD] z-10 ${!isSidebarOpen && ``}`}>
                    <div className={`flex h-12 bg-white mb-6 text-black z-10`}>
                        <div>{data.boardNames[data.currentBoard]}</div>
                        <div className={`ml-auto`}>
                            <button onClick={() => setSelection({mode: 'add'})}>Add New Task</button>
                            <DropdownMenu>
                                <DropdownMenuTrigger className={``}>Open</DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <button onClick={() => setBoardSelection({
                                            item: {
                                                name: data.boardNames[data.currentBoard],
                                                columns: Object.values(data.columnMaps[data.currentBoard])
                                            }, mode: 'edit'
                                        })}>Edit Board
                                        </button>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <button onClick={() => deleteBoard({
                                            boardId: data.currentBoard,
                                            trigger: 'pointer'
                                        })}>Delete Board
                                        </button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <BoardContext.Provider value={contextValue}>
                        {Object.keys(data.boardNames).length > 0 && <Board>
                            {data.orderedColumnIds[data.currentBoard].map((columnId) => {
                                return <Column setSelection={setSelection} itemMap={data.taskMap}
                                               column={data.columnMaps[data.currentBoard][columnId]} key={columnId}/>;
                            })}
                            <EmptyColumn/>
                        </Board>}
                        {Object.keys(data.boardNames).length == 0 && <div>Make some damn boards already!</div>}
                        {selection && <TaskView selection={selection} setSelection={setSelection}
                                                onDelete={(item) => deleteCard({
                                                    columnId: item.status,
                                                    itemId: item.userId,
                                                    trigger: 'pointer'
                                                })}
                                                onSave={(item) => moveCard({
                                                    providedItem: item,
                                                    startColumnId: selection.item?.status, finishColumnId: item.status,
                                                    itemIndexInStartColumn: selection.item?.index, trigger: 'pointer'
                                                })}
                                                columns={Object.keys(data.columnMaps[data.currentBoard])
                                                    .map((columnId) => ({
                                                        columnId,
                                                        title: data.columnMaps[data.currentBoard][columnId].title
                                                    }))}/>}
                        {selection && <TaskEdit selection={selection} setSelection={setSelection}
                                                onSaved={(item) => moveCard({
                                                    providedItem: item,
                                                    startColumnId: selection.item.status, finishColumnId: item.status,
                                                    itemIndexInStartColumn: selection.item.index, trigger: 'pointer'
                                                })}
                                                columns={Object.keys(data.columnMaps[data.currentBoard])
                                                    .map((columnId) => ({
                                                        columnId,
                                                        title: data.columnMaps[data.currentBoard][columnId].title
                                                    }))}/>}
                        {selection && <TaskAdd selection={selection} setSelection={setSelection}
                                               onSaved={(item) => addCard({
                                                   card: item,
                                                   trigger: 'pointer'
                                               })}
                                               columns={Object.keys(data.columnMaps[data.currentBoard])
                                                   .map((columnId) => ({
                                                       columnId,
                                                       title: data.columnMaps[data.currentBoard][columnId].title
                                                   }))}/>}
                        {boardSelection && <BoardAdd selection={boardSelection} setSelection={setBoardSelection}
                                                     onSaved={(item) => addBoard({
                                                         board: item,
                                                         trigger: 'pointer'
                                                     })}/>}
                        {boardSelection && <BoardEdit selection={boardSelection} setSelection={setBoardSelection}
                                                      onSaved={(item) => addBoard({
                                                          board: item,
                                                          trigger: 'pointer'
                                                      })}/>}
                        {selection && <MoveNew selection={selection} setSelection={setSelection}
                                               onSaved={(columnName) => moveCard({
                                                   providedItem: selection.item,
                                                   startColumnId: selection.item.status,
                                                   finishColumnId: generateDeterministicId(columnName.name),
                                                   newFinishColumnName: columnName.name,
                                                   itemIndexInStartColumn: selection.item.index, trigger: 'pointer'
                                               })}/>}
                    </BoardContext.Provider>
                </section>
            </main>


    );
}
