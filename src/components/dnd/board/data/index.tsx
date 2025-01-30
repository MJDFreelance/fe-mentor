/**
 * These imports are written out explicitly because they
 * need to be statically analyzable to be uploaded to CodeSandbox correctly.
 */
import Alexander from './images/processed/alexander';
import Aliza from './images/processed/alexander';
import Alvin from './images/processed/alexander';
import Angie from './images/processed/alexander';
import Arjun from './images/processed/alexander';
import Blair from './images/processed/alexander';
import Claudia from './images/processed/alexander';
import Colin from './images/processed/alexander';
import Ed from './images/processed/alexander';
import Effie from './images/processed/alexander';
import Eliot from './images/processed/alexander';
import Fabian from './images/processed/alexander';
import Gael from './images/processed/alexander';
import Gerard from './images/processed/alexander';
import Hasan from './images/processed/alexander';
import Helena from './images/processed/alexander';
import Ivan from './images/processed/alexander';
import Katina from './images/processed/alexander';
import Lara from './images/processed/alexander';
import Leo from './images/processed/alexander';
import Lydia from './images/processed/alexander';
import Maribel from './images/processed/alexander';
import Milo from './images/processed/alexander';
import Myra from './images/processed/alexander';
import Narul from './images/processed/alexander';
import Norah from './images/processed/alexander';
import Oliver from './images/processed/alexander';
import Rahul from './images/processed/alexander';
import Renato from './images/processed/alexander';
import Steve from './images/processed/alexander';
import Tanya from './images/processed/alexander';
import Tori from './images/processed/alexander';
import Vania from './images/processed/alexander';

export type Person = {
    userId: string;
    name: string;
    role: string;
    avatarUrl: string;
};

const avatarMap: Record<string, string> = {
    Alexander,
    Aliza,
    Alvin,
    Angie,
    Arjun,
    Blair,
    Claudia,
    Colin,
    Ed,
    Effie,
    Eliot,
    Fabian,
    Gael,
    Gerard,
    Hasan,
    Helena,
    Ivan,
    Katina,
    Lara,
    Leo,
    Lydia,
    Maribel,
    Milo,
    Myra,
    Narul,
    Norah,
    Oliver,
    Rahul,
    Renato,
    Steve,
    Tanya,
    Tori,
    Vania,
};

const names: string[] = Object.keys(avatarMap);

const roles: string[] = [
    'Engineer',
    'Senior Engineer',
    'Principal Engineer',
    'Engineering Manager',
    'Designer',
    'Senior Designer',
    'Lead Designer',
    'Design Manager',
    'Content Designer',
    'Product Manager',
    'Program Manager',
];

let sharedLookupIndex: number = 0;

/**
 * Note: this does not use randomness so that it is stable for VR tests
 */
export function getPerson(): Person {
    sharedLookupIndex++;
    return getPersonFromPosition({ position: sharedLookupIndex });
}

export function getPersonFromPosition({ position }: { position: number }): Person {
    // use the next name
    const name = names[position % names.length];
    // use the next role
    const role = roles[position % roles.length];
    return {
        userId: `id:${position}`,
        name,
        role,
        avatarUrl: avatarMap[name],
    };
}

export function getPeopleFromPosition({
                                          amount,
                                          startIndex,
                                      }: {
    amount: number;
    startIndex: number;
}): Person[] {
    return Array.from({ length: amount }, () => getPersonFromPosition({ position: startIndex++ }));
}

export function getPeople({ amount }: { amount: number }): Person[] {
    return Array.from({ length: amount }, () => getPerson());
}

export type ColumnType = {
    title: string;
    columnId: string;
    items: Person[];
};
export type ColumnMap = { [columnId: string]: ColumnType };

export function getData({
                            columnCount,
                            itemsPerColumn,
                        }: {
    columnCount: number;
    itemsPerColumn: number;
}) {
    const columnMap: ColumnMap = {};

    for (let i = 0; i < columnCount; i++) {
        const column: ColumnType = {
            title: `Column ${i}`,
            columnId: `column-${i}`,
            items: getPeople({ amount: itemsPerColumn }),
        };
        columnMap[column.columnId] = column;
    }
    const orderedColumnIds = Object.keys(columnMap);

    return {
        columnMap,
        orderedColumnIds,
        lastOperation: null,
    };
}

export function getBasicData() {
    const columnMap: ColumnMap = {
        confluence: {
            title: 'Confluence',
            columnId: 'confluence',
            items: getPeople({ amount: 10 }),
        },
        jira: {
            title: 'Jira',
            columnId: 'jira',
            items: getPeople({ amount: 10 }),
        },
        trello: {
            title: 'Trello',
            columnId: 'trello',
            items: getPeople({ amount: 10 }),
        },
    };

    const orderedColumnIds = ['confluence', 'jira', 'trello'];

    return {
        columnMap,
        orderedColumnIds,
    };
}
