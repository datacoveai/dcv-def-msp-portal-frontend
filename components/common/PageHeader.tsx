type PageHeaderProps = {
  title: string;
  description: string;
};

export default function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="mt-1 text-gray-600">{description}</p>
    </div>
  );
}