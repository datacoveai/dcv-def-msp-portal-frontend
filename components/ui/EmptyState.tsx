type EmptyStateProps = {
  message: string;
  colSpan: number;
};

export default function EmptyState({ message, colSpan }: EmptyStateProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="p-8 text-center text-gray-500">
        {message}
      </td>
    </tr>
  );
}
