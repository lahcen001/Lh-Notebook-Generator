interface PreviewProps {
  content: string;
  loading: boolean;
  onDownload: () => void;
}

export default function Preview({ content, loading, onDownload }: PreviewProps) {
  if (loading) {
    return <div className="text-center">Generating content...</div>;
  }

  if (!content) {
    return null;
  }

  return (
    <div className="border rounded-lg p-6">
      <div className="prose max-w-none mb-4">
        {content.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <button
        onClick={onDownload}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        Download PDF
      </button>
    </div>
  );
} 