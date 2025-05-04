import { Table } from "@/entities/PostChild";
import { LineComponent } from "./LineContentComponents";

export default function TableComponent(table: Table) {
    let key: string = "TableComponent";
    const rows: React.ReactNode[][] = [];
    for (const row of table.rows) {
        const cells: React.ReactNode[] = [];
        for (const cell of row.cells) {
            key += `${cell.start.line} - ${cell.start.offset}`;
            const lines: React.ReactNode[] = [];
            lines.push(LineComponent(cell));
            cells.push(lines);
        }
        rows.push(cells);
    }

    return (
        <div key={key} className="flex flex-col pt-8 pb-8">
            <table className="border border-gray-800 table-auto">
                <tbody className="border border-gray-600">
                    {rows.map((row: React.ReactNode[], rowIndex: number) => (
                        <tr
                            key={`${key}-${rowIndex}`}
                            className="border border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700"
                        >
                            {row.map(
                                (cell: React.ReactNode, cellIndex: number) => {
                                    return (
                                        <td
                                            key={`${key}-${rowIndex}-${cellIndex}`}
                                            className="border border-gray-600 p-3 text-center"
                                        >
                                            {cell}
                                        </td>
                                    );
                                }
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
