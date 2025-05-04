import {
    LineComponent,
    LineContentProps,
    generateRandomKey,
} from "./LineContentComponents";

export interface TableRow {
    cells: TableCell[];
}

export interface TableCell {
    value: LineContentProps[];
}

interface TableComponentProps {
    params: {
        rows: TableRow[];
    };
}

export default function TableComponent({ params }: TableComponentProps) {
    const rows: any[] = [];
    for (const row of params.rows) {
        const cells: any[] = [];
        for (const cell of row.cells) {
            const lines: any[] = [];
            for (const value of cell.value) {
                value.value = value.value.replaceAll("v{}", "|");
                lines.push(LineComponent(value));
            }
            cells.push(lines);
        }
        rows.push(cells);
    }

    return (
        <div className="flex flex-col pt-8 px-52 pb-8">
            <table className="min-w-max w-4/5 table-auto border border-gray-800 m-auto">
                <tbody className="border border-gray-600">
                    {rows.map((row: any, _: any) => (
                        <tr
                            key={generateRandomKey("table-tr")}
                            className="border border-gray-600 hover:bg-gray-300"
                        >
                            {row.map((cell: any, _: any) => {
                                return (
                                    <td
                                        key={generateRandomKey("table-td")}
                                        className="border border-gray-600 p-3 text-center"
                                    >
                                        {cell}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
